const STORAGE_KEY = "taktgefuehl.sessions.v1";
const MIN_BPM = 30;
const MAX_BPM = 240;
const SCHEDULER_INTERVAL_MS = 25;
const SCHEDULE_AHEAD_SECONDS = 0.12;

const tempoInput = document.querySelector("#tempo-input");
const tempoSlider = document.querySelector("#tempo-slider");
const meterSelect = document.querySelector("#meter-select");
const beatTrack = document.querySelector("#beat-track");
const metronomeToggle = document.querySelector("#metronome-toggle");
const metronomeStatus = document.querySelector("#metronome-status");
const metronomeStatusText = document.querySelector("#metronome-status-text");
const metronomeButtonText = document.querySelector("#metronome-button-text");
const metronomeButtonIcon = document.querySelector("#metronome-button-icon");
const sessionDurationInput = document.querySelector("#session-duration");
const sessionTimer = document.querySelector("#session-timer");
const sessionCaption = document.querySelector("#session-caption");
const sessionPauseButton = document.querySelector("#session-pause");
const sessionEndButton = document.querySelector("#session-end");
const historyList = document.querySelector("#history-list");
const totalPractice = document.querySelector("#total-practice");
const toast = document.querySelector("#toast");

let audioContext;
let metronomeRunning = false;
let schedulerId;
let nextBeatTime = 0;
let nextBeat = 0;
let beatHighlightTimeout;
let sessionStartedAt = 0;
let sessionDurationMs = 15 * 60_000;
let sessionRemainingMs = sessionDurationMs;
let sessionState = "idle";
let sessionStartPending = false;
let sessionIntervalId;
let toastTimeout;
let sessions = loadSessions();

function clampTempo(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 80;
  return Math.min(MAX_BPM, Math.max(MIN_BPM, parsed));
}

function setTempo(value, { restoreOnInvalid = false } = {}) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    if (restoreOnInvalid) tempoInput.value = String(clampTempo(tempoSlider.value));
    return;
  }
  const tempo = clampTempo(parsed);
  tempoInput.value = String(tempo);
  tempoSlider.value = String(tempo);
  tempoSlider.style.setProperty("--progress", `${((tempo - MIN_BPM) / (MAX_BPM - MIN_BPM)) * 100}%`);
  if (metronomeRunning && audioContext) nextBeatTime = audioContext.currentTime + 0.03;
}

function renderBeats() {
  const count = Number(meterSelect.value.split("/")[0]);
  beatTrack.replaceChildren();
  beatTrack.setAttribute("aria-label", `Takt: ${count} Schläge`);
  for (let index = 0; index < count; index += 1) {
    const indicator = document.createElement("span");
    indicator.className = `beat-indicator${index === 0 ? " accent" : ""}`;
    indicator.dataset.beat = String(index);
    beatTrack.append(indicator);
  }
}

function playClick(time, accented) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = accented ? 1250 : 830;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(accented ? 0.28 : 0.16, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(time);
  oscillator.stop(time + 0.05);
}

function showBeat(index, time) {
  const delay = Math.max(0, (time - audioContext.currentTime) * 1000);
  window.setTimeout(() => {
    beatTrack.querySelectorAll(".beat-indicator").forEach((indicator) => {
      indicator.classList.toggle("is-active", Number(indicator.dataset.beat) === index);
    });
    window.clearTimeout(beatHighlightTimeout);
    beatHighlightTimeout = window.setTimeout(() => {
      beatTrack.querySelectorAll(".beat-indicator").forEach((indicator) => indicator.classList.remove("is-active"));
    }, Math.max(80, (60_000 / Number(tempoInput.value)) * 0.65));
  }, delay);
}

function scheduleBeats() {
  while (nextBeatTime < audioContext.currentTime + SCHEDULE_AHEAD_SECONDS) {
    const beatInBar = nextBeat;
    playClick(nextBeatTime, beatInBar === 0);
    showBeat(beatInBar, nextBeatTime);
    nextBeat = (nextBeat + 1) % Number(meterSelect.value.split("/")[0]);
    nextBeatTime += 60 / Number(tempoInput.value);
  }
}

async function startMetronomeAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("Audio wird von diesem Browser nicht unterstützt.");
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") await audioContext.resume();
    metronomeRunning = true;
    nextBeatTime = audioContext.currentTime + 0.05;
    schedulerId = window.setInterval(scheduleBeats, SCHEDULER_INTERVAL_MS);
    scheduleBeats();
    return true;
  } catch (error) {
    showToast(error instanceof Error ? error.message : "Das Metronom konnte nicht gestartet werden.");
    return false;
  }
}

function renderSessionControls() {
  const isActive = sessionState !== "idle";
  sessionDurationInput.disabled = isActive || sessionStartPending;
  metronomeToggle.disabled = sessionStartPending;
  sessionPauseButton.disabled = sessionStartPending;
  sessionEndButton.disabled = sessionStartPending;
  sessionPauseButton.hidden = !isActive;
  sessionEndButton.hidden = !isActive;
  sessionPauseButton.textContent = sessionState === "paused" ? "Fortsetzen" : "Pause";
  metronomeToggle.setAttribute("aria-pressed", String(sessionState === "running"));
  metronomeStatus.classList.toggle("is-running", sessionState === "running");
  metronomeStatusText.textContent =
    sessionState === "running" ? "Läuft" : sessionState === "paused" ? "Pausiert" : "Bereit";
  metronomeButtonText.textContent =
    sessionState === "running" ? "Session beenden" : sessionState === "paused" ? "Fortsetzen" : "Metronom starten";
  metronomeButtonIcon.textContent = sessionState === "running" ? "■" : "▶";
}

function stopMetronomeAudio() {
  metronomeRunning = false;
  window.clearInterval(schedulerId);
  window.clearTimeout(beatHighlightTimeout);
  beatTrack.querySelectorAll(".beat-indicator").forEach((indicator) => indicator.classList.remove("is-active"));
  renderSessionControls();
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimer() {
  if (sessionState === "running") {
    const elapsed = Date.now() - sessionStartedAt;
    sessionRemainingMs = Math.max(0, sessionRemainingMs - elapsed);
    sessionStartedAt = Date.now();
    if (sessionRemainingMs === 0) {
      endSession(true);
      return;
    }
  }
  sessionTimer.textContent = formatTime(Math.ceil(sessionRemainingMs / 1000));
}

async function startSession() {
  if (sessionState !== "idle" || sessionStartPending) return;
  const durationMinutes = Number(sessionDurationInput.value);
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 240) {
    showToast("Bitte eine Übedauer zwischen 1 und 240 Minuten eingeben.");
    sessionDurationInput.focus();
    return;
  }

  sessionStartPending = true;
  renderSessionControls();
  nextBeat = 0;
  const audioStarted = await startMetronomeAudio();
  sessionStartPending = false;
  if (!audioStarted) {
    renderSessionControls();
    return;
  }
  sessionDurationMs = durationMinutes * 60_000;
  sessionRemainingMs = sessionDurationMs;
  sessionState = "running";
  sessionStartedAt = Date.now();
  sessionIntervalId = window.setInterval(updateTimer, 100);
  sessionCaption.textContent = "Session läuft — das Metronom stoppt bei 0.";
  updateTimer();
  renderSessionControls();
}

async function resumeSession() {
  if (sessionState !== "paused" || sessionStartPending) return;
  sessionStartPending = true;
  renderSessionControls();
  const audioStarted = await startMetronomeAudio();
  sessionStartPending = false;
  if (!audioStarted) {
    renderSessionControls();
    return;
  }
  sessionState = "running";
  sessionStartedAt = Date.now();
  sessionIntervalId = window.setInterval(updateTimer, 100);
  sessionCaption.textContent = "Session läuft — das Metronom stoppt bei 0.";
  renderSessionControls();
}

function pauseSession() {
  if (sessionState === "running") {
    sessionRemainingMs = Math.max(0, sessionRemainingMs - (Date.now() - sessionStartedAt));
    if (sessionRemainingMs === 0) {
      endSession(true);
      return;
    }
    sessionStartedAt = 0;
    window.clearInterval(sessionIntervalId);
    sessionState = "paused";
    sessionTimer.textContent = formatTime(Math.ceil(sessionRemainingMs / 1000));
    stopMetronomeAudio();
    sessionCaption.textContent = "Session pausiert.";
  } else if (sessionState === "paused") {
    void resumeSession();
  }
}

function endSession(completed = false) {
  if (sessionState === "idle") return;
  if (sessionState === "running") {
    sessionRemainingMs = Math.max(0, sessionRemainingMs - (Date.now() - sessionStartedAt));
    if (sessionRemainingMs === 0) completed = true;
  }
  if (completed) sessionRemainingMs = 0;
  sessionStartedAt = 0;
  window.clearInterval(sessionIntervalId);
  const durationSeconds = Math.floor((sessionDurationMs - sessionRemainingMs) / 1000);
  sessionState = "idle";
  stopMetronomeAudio();
  sessionTimer.textContent = "00:00";
  sessionCaption.textContent = completed ? "Zeit ist um — gut gemacht!" : "Session beendet.";

  if (durationSeconds > 0) {
    const session = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      durationSeconds,
      bpm: Number(tempoInput.value),
      meter: meterSelect.value,
    };
    const updatedSessions = [session, ...sessions];
    if (saveSessions(updatedSessions)) {
      sessions = updatedSessions;
      renderHistory();
      showToast(completed ? "Zeit ist um — Session gespeichert!" : "Session gespeichert — gut gemacht!");
    }
  } else {
    showToast("Die Session war zu kurz, um gespeichert zu werden.");
  }
}

function loadSessions() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Ungültiges Speicherformat.");
    return parsed.filter((session) =>
      session &&
      typeof session.id === "string" &&
      typeof session.date === "string" &&
      Number.isFinite(session.durationSeconds) &&
      Number.isFinite(session.bpm) &&
      typeof session.meter === "string"
    );
  } catch (error) {
    window.setTimeout(() => showToast("Der gespeicherte Übeverlauf konnte nicht geladen werden."), 0);
    console.error("Übeverlauf konnte nicht geladen werden:", error);
    return [];
  }
}

function saveSessions(nextSessions) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSessions));
    return true;
  } catch (error) {
    showToast("Speichern nicht möglich. Prüfe den Speicherplatz oder deine Browsereinstellungen.");
    console.error("Übeverlauf konnte nicht gespeichert werden:", error);
    return false;
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) return `${remainingSeconds} Sek.`;
  if (remainingSeconds === 0) return `${minutes} Min.`;
  return `${minutes} Min. ${String(remainingSeconds).padStart(2, "0")} Sek.`;
}

function renderHistory() {
  const totalSeconds = sessions.reduce((sum, session) => sum + session.durationSeconds, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalSeconds < 60) {
    totalPractice.textContent = `${totalSeconds} Sek.`;
  } else {
    totalPractice.textContent = totalMinutes === 1 ? "1 Min." : `${totalMinutes} Min.`;
  }
  historyList.replaceChildren();

  if (sessions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "Noch keine Sessions. Deine erste Übezeit erscheint hier.";
    historyList.append(empty);
    return;
  }

  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  sessions.forEach((session) => {
    const row = document.createElement("article");
    row.className = "history-entry";

    const icon = document.createElement("span");
    icon.className = "history-date-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "♫";

    const details = document.createElement("div");
    const date = document.createElement("span");
    date.className = "history-date";
    date.textContent = dateFormatter.format(new Date(session.date));
    const meta = document.createElement("span");
    meta.className = "history-meta";
    meta.textContent = `${session.bpm} BPM · ${session.meter}`;
    details.append(date, meta);

    const duration = document.createElement("span");
    duration.className = "history-duration";
    duration.textContent = formatDuration(session.durationSeconds);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-session";
    deleteButton.type = "button";
    deleteButton.dataset.sessionId = session.id;
    deleteButton.setAttribute("aria-label", `Session vom ${dateFormatter.format(new Date(session.date))} löschen`);
    deleteButton.textContent = "×";

    row.append(icon, details, duration, deleteButton);
    historyList.append(row);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

tempoInput.addEventListener("change", () => setTempo(tempoInput.value, { restoreOnInvalid: true }));
tempoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    setTempo(tempoInput.value, { restoreOnInvalid: true });
    tempoInput.blur();
  }
});
tempoSlider.addEventListener("input", () => setTempo(tempoSlider.value));
document.querySelector("#tempo-down").addEventListener("click", () => setTempo(Number(tempoInput.value) - 1));
document.querySelector("#tempo-up").addEventListener("click", () => setTempo(Number(tempoInput.value) + 1));
meterSelect.addEventListener("change", () => {
  nextBeat = 0;
  renderBeats();
});
metronomeToggle.addEventListener("click", () => {
  if (sessionState === "running") endSession();
  else if (sessionState === "paused") void resumeSession();
  else void startSession();
});
sessionPauseButton.addEventListener("click", pauseSession);
sessionEndButton.addEventListener("click", () => endSession(false));
sessionDurationInput.addEventListener("input", () => {
  const durationMinutes = Number(sessionDurationInput.value);
  if (Number.isInteger(durationMinutes) && durationMinutes >= 1 && durationMinutes <= 240) {
    sessionDurationMs = durationMinutes * 60_000;
    sessionRemainingMs = sessionDurationMs;
    sessionTimer.textContent = formatTime(durationMinutes * 60);
  }
});
sessionDurationInput.addEventListener("change", () => {
  const durationMinutes = Number(sessionDurationInput.value);
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 240) {
    sessionDurationInput.value = String(sessionDurationMs / 60_000);
    showToast("Bitte eine Übedauer zwischen 1 und 240 Minuten eingeben.");
  }
});
historyList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-session");
  if (!button) return;
  const updatedSessions = sessions.filter((session) => session.id !== button.dataset.sessionId);
  if (saveSessions(updatedSessions)) {
    sessions = updatedSessions;
    renderHistory();
    showToast("Session gelöscht.");
  }
});
window.addEventListener("beforeunload", () => {
  if (metronomeRunning) stopMetronomeAudio();
  window.clearInterval(sessionIntervalId);
});

setTempo(tempoInput.value);
renderBeats();
renderHistory();
