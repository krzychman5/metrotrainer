const STORAGE_KEY = "taktgefuehl.sessions.v1";
const VOLUME_STORAGE_KEY = "taktgefuehl.volume.v1";
const LANGUAGE_STORAGE_KEY = "taktgefuehl.language.v1";
const MIN_BPM = 30;
const MAX_BPM = 240;
const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
const MAX_IMPORTED_SESSIONS = 10_000;
const SCHEDULER_INTERVAL_MS = 25;
const SCHEDULE_AHEAD_SECONDS = 0.12;
const PYRAMID_SUBDIVISIONS = [1, 2, 3, 4, 3, 2];
const SUPPORTED_METERS = ["2/4", "3/4", "4/4", "6/8"];
const EXERCISE_KEYS = ["free", "pyramid", "eighth", "triplets", "sixteenths", "accent-shift"];
const translations = {
  de: {
    documentTitle: "Taktgefühl – Metronom",
    pageDescription: "Ein einfaches Metronom mit Übesession-Timer und lokalem Trainingsverlauf.",
    brandHome: "Taktgefühl Startseite",
    languageSelect: "Sprache auswählen",
    privacyNote: "Alles bleibt auf diesem Gerät",
    heroEyebrow: "DEIN RAUM ZUM ÜBEN",
    heroTitleStart: "Finde deinen",
    heroTitleEnd: "Takt.",
    heroCopy: "Ein klarer Beat. Ein bisschen Zeit für dich. Los geht’s.",
    metronomeEyebrow: "METRONOM",
    metronomeTitle: "Dein Tempo",
    statusReady: "Bereit",
    statusRunning: "Läuft",
    statusPaused: "Pausiert",
    tempoDown: "Tempo um 1 BPM verringern",
    tempoUp: "Tempo um 1 BPM erhöhen",
    tempoInput: "Tempo in BPM",
    tempoSlider: "Tempo einstellen",
    volumeLabel: "Lautstärke",
    exerciseLabel: "Übung",
    exerciseFree: "Freies Üben",
    exercisePyramid: "Rhythmuspyramide",
    exerciseEighth: "Achtel-Flow",
    exerciseTriplets: "Triolen-Flow",
    exerciseSixteenths: "Sechzehntel-Flow",
    exerciseAccentShift: "Akzentwechsel",
    exerciseDescriptionFree: "Eigene Unterteilung wählen.",
    exerciseDescriptionPyramid: "Je vier Takte: Viertel → Achtel → Triolen → Sechzehntel und zurück.",
    exerciseDescriptionEighth: "Gleichmäßige Achtel auf jedem Schlag.",
    exerciseDescriptionTriplets: "Drei gleichmäßige Klicks pro Schlag.",
    exerciseDescriptionSixteenths: "Vier gleichmäßige Klicks pro Schlag.",
    exerciseDescriptionAccentShift: "Der Akzent wandert nach jedem Takt um einen Schlag weiter.",
    meterLabel: "Taktart",
    subdivisionLabel: "Unterteilung",
    subdivisionNone: "Keine",
    subdivisionEighth: "Achtel",
    subdivisionTriplets: "Triolen",
    subdivisionSixteenths: "Sechzehntel",
    startMetronome: "Metronom starten",
    endSessionButton: "Session beenden",
    resume: "Fortsetzen",
    pause: "Pause",
    end: "Beenden",
    metronomeHelper: "Erster Schlag betont · Unterteilungen klingen leiser.",
    sessionEyebrow: "KONZENTRIERTE ZEIT",
    sessionTitle: "Übesession",
    defaultSessionName: "Übesession",
    sessionNameLabel: "Sessionname",
    durationLabel: "Übedauer",
    minutesShort: "Min.",
    durationHelp: "1 bis 240 Minuten",
    tempoRampSummary: "Tempo-Steigerung (optional)",
    tempoRampToggle: "Während der Session steigern",
    tempoRampEvery: "Alle",
    barsOption: "{count} Takte",
    tempoRampStepLabel: "Steigerung je Schritt",
    tempoRampDown: "BPM-Steigerung verringern",
    tempoRampStepInput: "BPM-Steigerung pro Schritt",
    tempoRampUp: "BPM-Steigerung erhöhen",
    tempoRampTargetLabel: "Zieltempo (optional)",
    tempoRampTargetPlaceholder: "Bis 240 BPM",
    tempoRampHint: "Ohne Zieltempo endet die Steigerung bei 240 BPM.",
    timerLabel: "Verbleibende Übezeit",
    sessionCaptionIdle: "Dauer wählen, dann das Metronom starten.",
    sessionCaptionRunning: "Session läuft — das Metronom stoppt bei 0.",
    sessionCaptionPaused: "Session pausiert.",
    sessionCaptionCompleted: "Zeit ist um — gut gemacht!",
    sessionCaptionEnded: "Session beendet.",
    sessionNote: "Bei 0 stoppt das Metronom automatisch.",
    historyEyebrow: "DEIN WEG",
    historyTitle: "Übeverlauf",
    totalPracticeLabel: "Insgesamt geübt",
    exportButton: "Exportieren",
    importButton: "Wiederherstellen",
    exportLabel: "Übeverlauf exportieren",
    importLabel: "Übeverlauf wiederherstellen",
    exportEmpty: "Es gibt noch keine Sessions zum Exportieren.",
    exportSuccess: "Übeverlauf wurde exportiert.",
    exportFailed: "Der Übeverlauf konnte nicht exportiert werden.",
    importInvalid: "Die Datei ist kein gültiger Taktgefühl-Export.",
    importTooLarge: "Die Datei ist zu groß. Erlaubt sind höchstens 5 MB.",
    importTooMany: "Die Datei enthält zu viele Sessions.",
    importNoNewSessions: "Es wurden keine neuen Sessions gefunden.",
    importSuccessOne: "1 neue Session wurde wiederhergestellt.",
    importSuccessMany: "{count} neue Sessions wurden wiederhergestellt.",
    importFailed: "Der Übeverlauf konnte nicht wiederhergestellt werden.",
    localDataNote: "Sessions liegen unverschlüsselt in diesem Browser. Exportdateien sicher aufbewahren; Duplikate werden übersprungen.",
    footer: "Mit Ruhe üben. Schritt für Schritt.",
    creatorCredit: "Von mir entwickelt",
    beatTrackAria: "Takt: {count} Schläge",
    pyramidProgress: "Stufe {stage}/{total} · {subdivision} · Takt {bar}/4",
    quarter: "Viertel",
    secondsShort: "Sek.",
    minuteShort: "Min.",
    seconds: "Sekunden",
    minutes: "Minuten",
    historyEmpty: "Noch keine Sessions. Deine erste Übezeit erscheint hier.",
    historyDelete: "{name} vom {date} löschen",
    historyMeta: "{tempo} · {exercise} · {meter}",
    targetTempoReached: "Zieltempo {tempo} BPM erreicht.",
    invalidRampStep: "Die Steigerung muss zwischen 1 und 240 BPM liegen.",
    invalidDuration: "Bitte eine Übedauer zwischen 1 und 240 Minuten eingeben.",
    invalidRampTarget: "Das Zieltempo muss über dem Starttempo und höchstens bei 240 BPM liegen.",
    audioUnsupported: "Audio wird von diesem Browser nicht unterstützt.",
    audioStartFailed: "Das Metronom konnte nicht gestartet werden.",
    sessionSavedCompleted: "Zeit ist um — Session gespeichert!",
    sessionSaved: "Session gespeichert — gut gemacht!",
    sessionTooShort: "Die Session war zu kurz, um gespeichert zu werden.",
    sessionsLoadFailed: "Der gespeicherte Übeverlauf konnte nicht geladen werden.",
    sessionsSaveFailed: "Speichern nicht möglich. Prüfe den Speicherplatz oder deine Browsereinstellungen.",
    sessionDeleted: "Session gelöscht.",
    volumeLoadFailed: "Die gespeicherte Lautstärke konnte nicht geladen werden.",
    volumeSaveFailed: "Die Lautstärke konnte nicht gespeichert werden.",
    languageSaveFailed: "Die Sprachauswahl konnte nicht gespeichert werden.",
    languageLoadFailed: "Die gespeicherte Sprachauswahl konnte nicht geladen werden.",
  },
  en: {
    documentTitle: "Taktgefühl – Metronome",
    pageDescription: "A simple metronome with a practice timer and locally saved progress.",
    brandHome: "Taktgefühl home",
    languageSelect: "Choose language",
    privacyNote: "Everything stays on this device",
    heroEyebrow: "YOUR SPACE TO PRACTISE",
    heroTitleStart: "Find your",
    heroTitleEnd: "rhythm.",
    heroCopy: "A steady beat. A little time for yourself. Let’s begin.",
    metronomeEyebrow: "METRONOME",
    metronomeTitle: "Your tempo",
    statusReady: "Ready",
    statusRunning: "Playing",
    statusPaused: "Paused",
    tempoDown: "Decrease tempo by 1 BPM",
    tempoUp: "Increase tempo by 1 BPM",
    tempoInput: "Tempo in BPM",
    tempoSlider: "Set tempo",
    volumeLabel: "Volume",
    exerciseLabel: "Exercise",
    exerciseFree: "Free practice",
    exercisePyramid: "Rhythm pyramid",
    exerciseEighth: "Eighth-note flow",
    exerciseTriplets: "Triplet flow",
    exerciseSixteenths: "Sixteenth-note flow",
    exerciseAccentShift: "Accent shift",
    exerciseDescriptionFree: "Choose your own subdivision.",
    exerciseDescriptionPyramid: "Every four bars: quarter notes → eighth notes → triplets → sixteenths and back.",
    exerciseDescriptionEighth: "Even eighth notes on every beat.",
    exerciseDescriptionTriplets: "Three even clicks per beat.",
    exerciseDescriptionSixteenths: "Four even clicks per beat.",
    exerciseDescriptionAccentShift: "The accent moves forward by one beat after each bar.",
    meterLabel: "Time signature",
    subdivisionLabel: "Subdivision",
    subdivisionNone: "None",
    subdivisionEighth: "Eighth notes",
    subdivisionTriplets: "Triplets",
    subdivisionSixteenths: "Sixteenth notes",
    startMetronome: "Start metronome",
    endSessionButton: "End session",
    resume: "Resume",
    pause: "Pause",
    end: "End",
    metronomeHelper: "The first beat is accented · subdivisions are quieter.",
    sessionEyebrow: "FOCUSED PRACTICE",
    sessionTitle: "Practice session",
    defaultSessionName: "Practice session",
    sessionNameLabel: "Session name",
    durationLabel: "Duration",
    minutesShort: "min",
    durationHelp: "1 to 240 minutes",
    tempoRampSummary: "Tempo increase (optional)",
    tempoRampToggle: "Increase tempo during the session",
    tempoRampEvery: "Every",
    barsOption: "{count} bars",
    tempoRampStepLabel: "Increase per step",
    tempoRampDown: "Decrease BPM increase",
    tempoRampStepInput: "BPM increase per step",
    tempoRampUp: "Increase BPM increase",
    tempoRampTargetLabel: "Target tempo (optional)",
    tempoRampTargetPlaceholder: "Up to 240 BPM",
    tempoRampHint: "Without a target tempo, the increase stops at 240 BPM.",
    timerLabel: "Practice time remaining",
    sessionCaptionIdle: "Choose a duration, then start the metronome.",
    sessionCaptionRunning: "Session running — the metronome stops at zero.",
    sessionCaptionPaused: "Session paused.",
    sessionCaptionCompleted: "Time is up — well done!",
    sessionCaptionEnded: "Session ended.",
    sessionNote: "The metronome stops automatically at zero.",
    historyEyebrow: "YOUR PROGRESS",
    historyTitle: "Practice history",
    totalPracticeLabel: "Total practice",
    exportButton: "Export",
    importButton: "Restore",
    exportLabel: "Export practice history",
    importLabel: "Restore practice history",
    exportEmpty: "There are no sessions to export yet.",
    exportSuccess: "Practice history exported.",
    exportFailed: "Could not export practice history.",
    importInvalid: "This is not a valid Taktgefühl export file.",
    importTooLarge: "The file is too large. The limit is 5 MB.",
    importTooMany: "The file contains too many sessions.",
    importNoNewSessions: "No new sessions were found.",
    importSuccessOne: "1 new session restored.",
    importSuccessMany: "{count} new sessions restored.",
    importFailed: "Could not restore practice history.",
    localDataNote: "Sessions are unencrypted in this browser. Keep exports safe; duplicates are skipped on import.",
    footer: "Practise calmly. One step at a time.",
    creatorCredit: "Made by me",
    beatTrackAria: "Time signature: {count} beats",
    pyramidProgress: "Stage {stage}/{total} · {subdivision} · Bar {bar}/4",
    quarter: "Quarter notes",
    secondsShort: "sec",
    minuteShort: "min",
    seconds: "seconds",
    minutes: "minutes",
    historyEmpty: "No sessions yet. Your first practice session will appear here.",
    historyDelete: "Delete {name} from {date}",
    historyMeta: "{tempo} · {exercise} · {meter}",
    targetTempoReached: "Target tempo of {tempo} BPM reached.",
    invalidRampStep: "The increase must be between 1 and 240 BPM.",
    invalidDuration: "Enter a practice duration between 1 and 240 minutes.",
    invalidRampTarget: "The target tempo must be above the starting tempo and no higher than 240 BPM.",
    audioUnsupported: "Audio is not supported by this browser.",
    audioStartFailed: "Could not start the metronome.",
    sessionSavedCompleted: "Time is up — session saved!",
    sessionSaved: "Session saved — well done!",
    sessionTooShort: "The session was too short to save.",
    sessionsLoadFailed: "Could not load the saved practice history.",
    sessionsSaveFailed: "Could not save. Check available storage or your browser settings.",
    sessionDeleted: "Session deleted.",
    volumeLoadFailed: "Could not load the saved volume.",
    volumeSaveFailed: "Could not save the volume.",
    languageSaveFailed: "Could not save the language preference.",
    languageLoadFailed: "Could not load the saved language preference.",
  },
};

const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
const preferredLanguage = browserLocales
  .map((locale) => locale.toLowerCase().split("-")[0])
  .find((language) => language === "de" || language === "en");
let LANGUAGE = preferredLanguage || "en";

function getLocale(language) {
  return browserLocales.find(
    (locale) => locale.toLowerCase().startsWith(`${language}-`) || locale.toLowerCase() === language
  ) || (language === "de" ? "de-DE" : "en-US");
}

let LOCALE = getLocale(LANGUAGE);

function t(key, values = {}) {
  const message = translations[LANGUAGE][key] || translations.en[key] || key;
  return message.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

let DEFAULT_SESSION_NAME;
let SUBDIVISION_NAMES;
const FIXED_EXERCISE_SUBDIVISIONS = {
  eighth: 2,
  triplets: 3,
  sixteenths: 4,
};
let EXERCISE_DESCRIPTIONS;
let EXERCISE_NAMES;

function refreshLanguageConstants() {
  DEFAULT_SESSION_NAME = t("defaultSessionName");
  SUBDIVISION_NAMES = [
    t("quarter"),
    t("subdivisionEighth"),
    t("subdivisionTriplets"),
    t("subdivisionSixteenths"),
  ];
  EXERCISE_DESCRIPTIONS = {
    free: t("exerciseDescriptionFree"),
    pyramid: t("exerciseDescriptionPyramid"),
    eighth: t("exerciseDescriptionEighth"),
    triplets: t("exerciseDescriptionTriplets"),
    sixteenths: t("exerciseDescriptionSixteenths"),
    "accent-shift": t("exerciseDescriptionAccentShift"),
  };
  EXERCISE_NAMES = {
    free: t("exerciseFree"),
    pyramid: t("exercisePyramid"),
    eighth: t("exerciseEighth"),
    triplets: t("exerciseTriplets"),
    sixteenths: t("exerciseSixteenths"),
    "accent-shift": t("exerciseAccentShift"),
  };
}

refreshLanguageConstants();

const tempoInput = document.querySelector("#tempo-input");
const tempoSlider = document.querySelector("#tempo-slider");
const volumeSlider = document.querySelector("#volume-slider");
const volumeValue = document.querySelector("#volume-value");
const meterSelect = document.querySelector("#meter-select");
const subdivisionSelect = document.querySelector("#subdivision-select");
const exerciseSelect = document.querySelector("#exercise-select");
const exerciseDescription = document.querySelector("#exercise-description");
const exerciseProgress = document.querySelector("#exercise-progress");
const beatTrack = document.querySelector("#beat-track");
const metronomeToggle = document.querySelector("#metronome-toggle");
const metronomeStatus = document.querySelector("#metronome-status");
const metronomeStatusText = document.querySelector("#metronome-status-text");
const metronomeButtonText = document.querySelector("#metronome-button-text");
const metronomeButtonIcon = document.querySelector("#metronome-button-icon");
const sessionNameInput = document.querySelector("#session-name");
const sessionDurationInput = document.querySelector("#session-duration");
const tempoRampEnabledInput = document.querySelector("#tempo-ramp-enabled");
const tempoRampFields = document.querySelector("#tempo-ramp-fields");
const tempoRampBarsInput = document.querySelector("#tempo-ramp-bars");
const tempoRampStepInput = document.querySelector("#tempo-ramp-step");
const tempoRampStepDownButton = document.querySelector("#tempo-ramp-step-down");
const tempoRampStepUpButton = document.querySelector("#tempo-ramp-step-up");
const tempoRampTargetInput = document.querySelector("#tempo-ramp-target");
const sessionTimer = document.querySelector("#session-timer");
const sessionCaption = document.querySelector("#session-caption");
const sessionPauseButton = document.querySelector("#session-pause");
const sessionEndButton = document.querySelector("#session-end");
const historyList = document.querySelector("#history-list");
const totalPractice = document.querySelector("#total-practice");
const exportSessionsButton = document.querySelector("#export-sessions");
const importSessionsButton = document.querySelector("#import-sessions-button");
const importSessionsFile = document.querySelector("#import-sessions-file");
const languageSelect = document.querySelector("#language-select");
const toast = document.querySelector("#toast");

function loadSavedLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "de" || stored === "en" ? stored : null;
  } catch (error) {
    window.setTimeout(() => showToast(t("languageLoadFailed")), 0);
    console.error("Sprachauswahl konnte nicht geladen werden:", error);
    return null;
  }
}

const savedLanguage = loadSavedLanguage();
if (savedLanguage) {
  LANGUAGE = savedLanguage;
  LOCALE = getLocale(LANGUAGE);
  refreshLanguageConstants();
}

function applyStaticTranslations() {
  document.documentElement.lang = LANGUAGE;
  document.title = t("documentTitle");
  document.querySelector("#page-description").setAttribute("content", t("pageDescription"));
  languageSelect.value = LANGUAGE;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const count = element.dataset.i18nCount;
    element.textContent = t(key, count ? { count } : {});
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  if (isDefaultSessionName(sessionNameInput.value)) {
    sessionNameInput.value = DEFAULT_SESSION_NAME;
  }
}

applyStaticTranslations();

let audioContext;
let metronomeRunning = false;
let schedulerId;
let nextBeatTime = 0;
let nextBeat = 0;
let nextSubdivision = 0;
let exerciseBarsCompleted = 0;
let sessionBarsCompleted = 0;
let beatHighlightTimeout;
let sessionStartedAt = 0;
let sessionDurationMs = 15 * 60_000;
let sessionRemainingMs = sessionDurationMs;
let sessionState = "idle";
let sessionCaptionKey = "sessionCaptionIdle";
let sessionStartPending = false;
let activeSessionName = DEFAULT_SESSION_NAME;
let activeSessionStartBpm = 80;
let activeSessionExercise = "free";
let activeTempoRamp = null;
let tempoRampStepValue = 1;
let sessionIntervalId;
let toastTimeout;
let volumeLevel = loadVolume();
let sessions = loadSessions();
syncVolumeControl();

function isDefaultSessionName(name) {
  return typeof name !== "string" ||
    !name.trim() ||
    name.trim() === translations.de.defaultSessionName ||
    name.trim() === translations.en.defaultSessionName;
}

function loadVolume() {
  try {
    const stored = window.localStorage.getItem(VOLUME_STORAGE_KEY);
    if (stored === null) return 100;
    const parsed = Number(stored);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 100) {
      throw new Error("Stored volume is outside the supported range.");
    }
    return parsed;
  } catch (error) {
    window.setTimeout(() => showToast(t("volumeLoadFailed")), 0);
    console.error("Lautstärke konnte nicht geladen werden:", error);
    return 100;
  }
}

function syncVolumeControl() {
  volumeSlider.value = String(volumeLevel);
  volumeValue.value = `${volumeLevel}%`;
  volumeValue.textContent = `${volumeLevel}%`;
  volumeSlider.setAttribute("aria-valuetext", `${volumeLevel}%`);
}

function setVolume(value, { persist = false } = {}) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 100) return false;
  volumeLevel = parsed;
  syncVolumeControl();
  if (!persist) return true;
  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(volumeLevel));
    return true;
  } catch (error) {
    showToast(t("volumeSaveFailed"));
    console.error("Lautstärke konnte nicht gespeichert werden:", error);
    return false;
  }
}

function clampTempo(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 80;
  return Math.min(MAX_BPM, Math.max(MIN_BPM, parsed));
}

function setTempoRampStep(value, { restoreOnInvalid = false } = {}) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_BPM) {
    if (restoreOnInvalid) {
      tempoRampStepInput.value = String(tempoRampStepValue);
      showToast(t("invalidRampStep"));
    }
    return false;
  }
  tempoRampStepValue = parsed;
  tempoRampStepInput.value = String(parsed);
  tempoRampStepDownButton.disabled = parsed <= 1;
  tempoRampStepUpButton.disabled = parsed >= MAX_BPM;
  return true;
}

function setTempo(value, { restoreOnInvalid = false, reschedule = true } = {}) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    if (restoreOnInvalid) tempoInput.value = String(clampTempo(tempoSlider.value));
    return;
  }
  const tempo = clampTempo(parsed);
  tempoInput.value = String(tempo);
  tempoSlider.value = String(tempo);
  tempoSlider.style.setProperty("--progress", `${((tempo - MIN_BPM) / (MAX_BPM - MIN_BPM)) * 100}%`);
  if (reschedule && metronomeRunning && audioContext) {
    nextSubdivision = 0;
    nextBeatTime = audioContext.currentTime + 0.03;
  }
}

function renderBeats() {
  const count = Number(meterSelect.value.split("/")[0]);
  const accentBeat = getAccentBeat();
  beatTrack.replaceChildren();
  beatTrack.setAttribute("aria-label", t("beatTrackAria", { count }));
  for (let index = 0; index < count; index += 1) {
    const indicator = document.createElement("span");
    indicator.className = `beat-indicator${index === accentBeat ? " accent" : ""}`;
    indicator.dataset.beat = String(index);
    beatTrack.append(indicator);
  }
}

function getCurrentSubdivisionCount() {
  if (exerciseSelect.value === "pyramid") {
    const stage = Math.floor(exerciseBarsCompleted / 4) % PYRAMID_SUBDIVISIONS.length;
    return PYRAMID_SUBDIVISIONS[stage];
  }
  return FIXED_EXERCISE_SUBDIVISIONS[exerciseSelect.value] || Number(subdivisionSelect.value);
}

function getAccentBeat() {
  if (exerciseSelect.value === "accent-shift") {
    return exerciseBarsCompleted % Number(meterSelect.value.split("/")[0]);
  }
  return 0;
}

function updateBeatAccents() {
  const accentBeat = getAccentBeat();
  beatTrack.querySelectorAll(".beat-indicator").forEach((indicator) => {
    indicator.classList.toggle("accent", Number(indicator.dataset.beat) === accentBeat);
  });
}

function updateExerciseProgress() {
  if (exerciseSelect.value !== "pyramid") {
    exerciseProgress.hidden = true;
    exerciseProgress.textContent = "";
    return;
  }
  const stage = Math.floor(exerciseBarsCompleted / 4) % PYRAMID_SUBDIVISIONS.length;
  const bar = (exerciseBarsCompleted % 4) + 1;
  exerciseProgress.hidden = false;
  exerciseProgress.textContent = t("pyramidProgress", {
    stage: stage + 1,
    total: PYRAMID_SUBDIVISIONS.length,
    subdivision: SUBDIVISION_NAMES[PYRAMID_SUBDIVISIONS[stage] - 1],
    bar,
  });
  subdivisionSelect.value = String(PYRAMID_SUBDIVISIONS[stage]);
}

function renderExerciseControls() {
  const exercise = exerciseSelect.value;
  const isFixedSubdivision = exercise === "pyramid" || exercise in FIXED_EXERCISE_SUBDIVISIONS;
  exerciseDescription.textContent = EXERCISE_DESCRIPTIONS[exercise] || EXERCISE_DESCRIPTIONS.free;
  exerciseSelect.disabled = sessionState !== "idle" || sessionStartPending;
  subdivisionSelect.disabled =
    isFixedSubdivision || sessionState !== "idle" || sessionStartPending;
  if (isFixedSubdivision && exercise !== "pyramid") {
    subdivisionSelect.value = String(FIXED_EXERCISE_SUBDIVISIONS[exercise]);
  }
  updateExerciseProgress();
  updateBeatAccents();
}

function playClick(time, accented, isSubdivision) {
  if (volumeLevel === 0) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = accented ? 1250 : isSubdivision ? 560 : 830;
  const clickDuration = isSubdivision ? 0.035 : 0.05;
  const peak = (accented ? 0.28 : isSubdivision ? 0.08 : 0.16) * (volumeLevel / 100);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + clickDuration - 0.005);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(time);
  oscillator.stop(time + clickDuration);
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
    const subdivisionsPerBeat = getCurrentSubdivisionCount();
    const beatInterval = 60 / Number(tempoInput.value) / subdivisionsPerBeat;
    const isMainBeat = nextSubdivision === 0;
    playClick(nextBeatTime, isMainBeat && nextBeat === getAccentBeat(), !isMainBeat);
    if (isMainBeat) showBeat(nextBeat, nextBeatTime);
    nextSubdivision += 1;
    if (nextSubdivision >= subdivisionsPerBeat) {
      nextSubdivision = 0;
      nextBeat = (nextBeat + 1) % Number(meterSelect.value.split("/")[0]);
      if (nextBeat === 0) {
        exerciseBarsCompleted += 1;
        sessionBarsCompleted += 1;
        updateExerciseProgress();
        updateBeatAccents();
        applyTempoRamp();
      }
    }
    nextBeatTime += beatInterval;
  }
}

function applyTempoRamp() {
  if (!activeTempoRamp || sessionBarsCompleted % activeTempoRamp.bars !== 0) return;
  const currentTempo = Number(tempoInput.value);
  if (currentTempo >= activeTempoRamp.target) return;
  const nextTempo = Math.min(activeTempoRamp.target, currentTempo + activeTempoRamp.step);
  if (nextTempo === currentTempo) return;
  setTempo(nextTempo, { reschedule: false });
  if (nextTempo === activeTempoRamp.target) showToast(t("targetTempoReached", { tempo: nextTempo }));
}

async function startMetronomeAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error(t("audioUnsupported"));
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") await audioContext.resume();
    metronomeRunning = true;
    nextBeatTime = audioContext.currentTime + 0.05;
    schedulerId = window.setInterval(scheduleBeats, SCHEDULER_INTERVAL_MS);
    scheduleBeats();
    return true;
  } catch (error) {
    showToast(
      error instanceof Error && error.message === t("audioUnsupported")
        ? error.message
        : t("audioStartFailed")
    );
    console.error("Metronom konnte nicht gestartet werden:", error);
    return false;
  }
}

function renderSessionControls() {
  const isActive = sessionState !== "idle";
  sessionNameInput.disabled = isActive || sessionStartPending;
  sessionDurationInput.disabled = isActive || sessionStartPending;
  tempoRampEnabledInput.disabled = isActive || sessionStartPending;
  tempoRampFields.disabled =
    !tempoRampEnabledInput.checked || isActive || sessionStartPending;
  metronomeToggle.disabled = sessionStartPending;
  sessionPauseButton.disabled = sessionStartPending;
  sessionEndButton.disabled = sessionStartPending;
  sessionPauseButton.hidden = !isActive;
  sessionEndButton.hidden = !isActive;
  sessionPauseButton.querySelector("[data-i18n]").textContent =
    sessionState === "paused" ? t("resume") : t("pause");
  metronomeToggle.setAttribute("aria-pressed", String(sessionState === "running"));
  metronomeStatus.classList.toggle("is-running", sessionState === "running");
  metronomeStatusText.textContent =
    sessionState === "running" ? t("statusRunning") :
      sessionState === "paused" ? t("statusPaused") : t("statusReady");
  metronomeButtonText.textContent =
    sessionState === "running" ? t("endSessionButton") :
      sessionState === "paused" ? t("resume") : t("startMetronome");
  metronomeButtonIcon.textContent = sessionState === "running" ? "■" : "▶";
  renderExerciseControls();
}

function setSessionCaption(key) {
  sessionCaptionKey = key;
  sessionCaption.textContent = t(key);
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
    showToast(t("invalidDuration"));
    sessionDurationInput.focus();
    return;
  }

  const startBpm = Number(tempoInput.value);
  let tempoRamp = null;
  if (tempoRampEnabledInput.checked) {
    const step = Number(tempoRampStepInput.value);
    if (!Number.isInteger(step) || step < 1 || step > MAX_BPM) {
      showToast(t("invalidRampStep"));
      tempoRampStepInput.focus();
      return;
    }
    const targetValue = tempoRampTargetInput.value.trim();
    const target = targetValue === "" ? MAX_BPM : Number(targetValue);
    if (
      !Number.isInteger(target) ||
      target < MIN_BPM ||
      target > MAX_BPM ||
      target <= startBpm
    ) {
      showToast(t("invalidRampTarget"));
      tempoRampTargetInput.focus();
      return;
    }
    tempoRamp = {
      bars: Number(tempoRampBarsInput.value),
      step,
      target,
    };
  }

  sessionStartPending = true;
  renderSessionControls();
  nextBeat = 0;
  nextSubdivision = 0;
  exerciseBarsCompleted = 0;
  updateExerciseProgress();
  const audioStarted = await startMetronomeAudio();
  sessionStartPending = false;
  if (!audioStarted) {
    renderSessionControls();
    return;
  }
  activeSessionName = sessionNameInput.value.trim() || DEFAULT_SESSION_NAME;
  sessionNameInput.value = activeSessionName;
  activeSessionStartBpm = startBpm;
  activeSessionExercise = exerciseSelect.value;
  activeTempoRamp = tempoRamp;
  sessionBarsCompleted = 0;
  sessionDurationMs = durationMinutes * 60_000;
  sessionRemainingMs = sessionDurationMs;
  sessionState = "running";
  sessionStartedAt = Date.now();
  sessionIntervalId = window.setInterval(updateTimer, 100);
  setSessionCaption("sessionCaptionRunning");
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
  setSessionCaption("sessionCaptionRunning");
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
    setSessionCaption("sessionCaptionPaused");
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
  setSessionCaption(completed ? "sessionCaptionCompleted" : "sessionCaptionEnded");

  if (durationSeconds > 0) {
    const session = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      name: activeSessionName,
      exercise: activeSessionExercise,
      exerciseName: EXERCISE_NAMES[activeSessionExercise] || EXERCISE_NAMES.free,
      startBpm: activeSessionStartBpm,
      endBpm: Number(tempoInput.value),
      durationSeconds,
      bpm: activeSessionStartBpm,
      meter: meterSelect.value,
    };
    const updatedSessions = [session, ...sessions];
    if (saveSessions(updatedSessions)) {
      sessions = updatedSessions;
      renderHistory();
      showToast(completed ? t("sessionSavedCompleted") : t("sessionSaved"));
    }
  } else {
    showToast(t("sessionTooShort"));
  }
  activeTempoRamp = null;
  sessionBarsCompleted = 0;
}

function loadSessions() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Invalid stored session format.");
    return parsed.filter((session) =>
      session &&
      typeof session.id === "string" &&
      typeof session.date === "string" &&
      Number.isFinite(session.durationSeconds) &&
      Number.isFinite(session.bpm) &&
      typeof session.meter === "string"
    ).map((session) => ({
      ...session,
      name: typeof session.name === "string" && session.name.trim()
        ? session.name
        : DEFAULT_SESSION_NAME,
    }));
  } catch (error) {
    window.setTimeout(() => showToast(t("sessionsLoadFailed")), 0);
    console.error("Übeverlauf konnte nicht geladen werden:", error);
    return [];
  }
}

function saveSessions(nextSessions) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSessions));
    return true;
  } catch (error) {
    showToast(t("sessionsSaveFailed"));
    console.error("Übeverlauf konnte nicht gespeichert werden:", error);
    return false;
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) return `${remainingSeconds} ${t("secondsShort")}`;
  if (remainingSeconds === 0) return `${minutes} ${t("minuteShort")}`;
  return `${minutes} ${t("minuteShort")} ${String(remainingSeconds).padStart(2, "0")} ${t("secondsShort")}`;
}

function renderHistory() {
  const totalSeconds = sessions.reduce((sum, session) => sum + session.durationSeconds, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalSeconds < 60) {
    totalPractice.textContent = `${totalSeconds} ${t("secondsShort")}`;
  } else {
    totalPractice.textContent = `${totalMinutes} ${t("minuteShort")}`;
  }
  historyList.replaceChildren();
  exportSessionsButton.disabled = sessions.length === 0;

  if (sessions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = t("historyEmpty");
    historyList.append(empty);
    return;
  }

  const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
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
    details.className = "history-details";
    const name = document.createElement("span");
    name.className = "history-session-name";
    name.textContent = isDefaultSessionName(session.name) ? DEFAULT_SESSION_NAME : session.name;
    const date = document.createElement("span");
    date.className = "history-meta";
    date.textContent = dateFormatter.format(new Date(session.date));
    const meta = document.createElement("span");
    meta.className = "history-meta";
    const startBpm = Number.isFinite(session.startBpm) ? session.startBpm : session.bpm;
    const endBpm = Number.isFinite(session.endBpm) ? session.endBpm : session.bpm;
    const tempoLabel = startBpm === endBpm ? `${startBpm} BPM` : `${startBpm} → ${endBpm} BPM`;
    const exerciseName = EXERCISE_NAMES[session.exercise] || EXERCISE_NAMES.free;
    meta.textContent = t("historyMeta", {
      tempo: tempoLabel,
      exercise: exerciseName,
      meter: session.meter,
    });
    details.append(name, date, meta);

    const duration = document.createElement("span");
    duration.className = "history-duration";
    duration.textContent = formatDuration(session.durationSeconds);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-session";
    deleteButton.type = "button";
    deleteButton.dataset.sessionId = session.id;
    deleteButton.setAttribute(
      "aria-label",
      t("historyDelete", {
        name: isDefaultSessionName(session.name) ? DEFAULT_SESSION_NAME : session.name,
        date: dateFormatter.format(new Date(session.date)),
      })
    );
    deleteButton.textContent = "×";

    row.append(icon, details, duration, deleteButton);
    historyList.append(row);
  });
}

function normalizeImportedSession(session) {
  if (!session || typeof session !== "object" || Array.isArray(session)) {
    throw new Error(t("importInvalid"));
  }
  const bpm = Number(session.bpm);
  const startBpm = Number.isInteger(session.startBpm) ? session.startBpm : bpm;
  const endBpm = Number.isInteger(session.endBpm) ? session.endBpm : bpm;
  const exercise = session.exercise || "free";
  if (
    typeof session.id !== "string" ||
    session.id.length === 0 ||
    session.id.length > 128 ||
    typeof session.date !== "string" ||
    !Number.isFinite(Date.parse(session.date)) ||
    !Number.isInteger(session.durationSeconds) ||
    session.durationSeconds < 1 ||
    !Number.isInteger(startBpm) ||
    startBpm < MIN_BPM ||
    startBpm > MAX_BPM ||
    !Number.isInteger(endBpm) ||
    endBpm < MIN_BPM ||
    endBpm > MAX_BPM ||
    !SUPPORTED_METERS.includes(session.meter) ||
    !EXERCISE_KEYS.includes(exercise) ||
    (session.name !== undefined && typeof session.name !== "string")
  ) {
    throw new Error(t("importInvalid"));
  }
  return {
    id: session.id,
    date: new Date(session.date).toISOString(),
    name: isDefaultSessionName(session.name) ? DEFAULT_SESSION_NAME : session.name.trim().slice(0, 60),
    exercise,
    exerciseName: EXERCISE_NAMES[exercise],
    startBpm,
    endBpm,
    durationSeconds: session.durationSeconds,
    bpm: startBpm,
    meter: session.meter,
  };
}

function exportSessions() {
  if (sessions.length === 0) {
    showToast(t("exportEmpty"));
    return;
  }
  try {
    const backup = {
      format: "taktgefuehl-sessions",
      version: 1,
      exportedAt: new Date().toISOString(),
      sessions,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `taktgefuehl-sessions-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t("exportSuccess"));
  } catch (error) {
    showToast(t("exportFailed"));
    console.error("Übeverlauf konnte nicht exportiert werden:", error);
  }
}

async function importSessions(file) {
  if (file.size > MAX_IMPORT_BYTES) throw new Error(t("importTooLarge"));
  const backup = JSON.parse(await file.text());
  if (
    !backup ||
    backup.format !== "taktgefuehl-sessions" ||
    backup.version !== 1 ||
    !Array.isArray(backup.sessions)
  ) {
    throw new Error(t("importInvalid"));
  }
  if (backup.sessions.length > MAX_IMPORTED_SESSIONS) throw new Error(t("importTooMany"));
  const imported = backup.sessions.map(normalizeImportedSession);
  const existingIds = new Set(sessions.map((session) => session.id));
  const additions = imported.filter((session) => {
    if (existingIds.has(session.id)) return false;
    existingIds.add(session.id);
    return true;
  });
  if (additions.length === 0) {
    showToast(t("importNoNewSessions"));
    return;
  }
  const updatedSessions = [...additions, ...sessions];
  if (saveSessions(updatedSessions)) {
    sessions = updatedSessions;
    renderHistory();
    showToast(t(additions.length === 1 ? "importSuccessOne" : "importSuccessMany", { count: additions.length }));
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setLanguage(language) {
  if (language !== "de" && language !== "en") return;
  LANGUAGE = language;
  LOCALE = getLocale(language);
  refreshLanguageConstants();
  if (isDefaultSessionName(activeSessionName)) activeSessionName = DEFAULT_SESSION_NAME;
  applyStaticTranslations();
  setSessionCaption(sessionCaptionKey);
  renderBeats();
  renderSessionControls();
  renderHistory();
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    showToast(t("languageSaveFailed"));
    console.error("Sprachauswahl konnte nicht gespeichert werden:", error);
  }
}

tempoInput.addEventListener("change", () => setTempo(tempoInput.value, { restoreOnInvalid: true }));
tempoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    setTempo(tempoInput.value, { restoreOnInvalid: true });
    tempoInput.blur();
  }
});
tempoSlider.addEventListener("input", () => setTempo(tempoSlider.value));
volumeSlider.addEventListener("input", () => setVolume(volumeSlider.value));
volumeSlider.addEventListener("change", () => setVolume(volumeSlider.value, { persist: true }));
document.querySelector("#tempo-down").addEventListener("click", () => setTempo(Number(tempoInput.value) - 1));
document.querySelector("#tempo-up").addEventListener("click", () => setTempo(Number(tempoInput.value) + 1));
exportSessionsButton.addEventListener("click", exportSessions);
importSessionsButton.addEventListener("click", () => importSessionsFile.click());
languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));
importSessionsFile.addEventListener("change", async () => {
  const file = importSessionsFile.files[0];
  if (!file) return;
  try {
    await importSessions(file);
  } catch (error) {
    const knownErrors = [t("importInvalid"), t("importTooLarge"), t("importTooMany")];
    showToast(error instanceof Error && knownErrors.includes(error.message) ? error.message : t("importFailed"));
    console.error("Übeverlauf konnte nicht wiederhergestellt werden:", error);
  } finally {
    importSessionsFile.value = "";
  }
});
meterSelect.addEventListener("change", () => {
  nextBeat = 0;
  nextSubdivision = 0;
  if (metronomeRunning && audioContext) nextBeatTime = audioContext.currentTime + 0.03;
  renderBeats();
  renderExerciseControls();
});
subdivisionSelect.addEventListener("change", () => {
  nextSubdivision = 0;
  if (metronomeRunning && audioContext) nextBeatTime = audioContext.currentTime + 0.03;
});
exerciseSelect.addEventListener("change", () => {
  exerciseBarsCompleted = 0;
  nextBeat = 0;
  nextSubdivision = 0;
  renderExerciseControls();
  if (metronomeRunning && audioContext) nextBeatTime = audioContext.currentTime + 0.03;
});
metronomeToggle.addEventListener("click", () => {
  if (sessionState === "running") endSession();
  else if (sessionState === "paused") void resumeSession();
  else void startSession();
});
sessionPauseButton.addEventListener("click", pauseSession);
sessionEndButton.addEventListener("click", () => endSession(false));
tempoRampEnabledInput.addEventListener("change", () => {
  tempoRampFields.disabled =
    !tempoRampEnabledInput.checked || sessionState !== "idle" || sessionStartPending;
});
tempoRampStepInput.addEventListener("change", () => {
  setTempoRampStep(tempoRampStepInput.value, { restoreOnInvalid: true });
});
tempoRampStepDownButton.addEventListener("click", () => {
  setTempoRampStep(Math.max(1, tempoRampStepValue - 1));
});
tempoRampStepUpButton.addEventListener("click", () => {
  setTempoRampStep(Math.min(MAX_BPM, tempoRampStepValue + 1));
});
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
    showToast(t("invalidDuration"));
  }
});
historyList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-session");
  if (!button) return;
  const updatedSessions = sessions.filter((session) => session.id !== button.dataset.sessionId);
  if (saveSessions(updatedSessions)) {
    sessions = updatedSessions;
    renderHistory();
    showToast(t("sessionDeleted"));
  }
});
window.addEventListener("beforeunload", () => {
  if (metronomeRunning) stopMetronomeAudio();
  window.clearInterval(sessionIntervalId);
});

setTempo(tempoInput.value);
setTempoRampStep(tempoRampStepInput.value);
renderBeats();
renderHistory();
