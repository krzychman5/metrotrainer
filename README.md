# Metronom – Anforderungen

## Ziel

Eine intuitive Metronom-Webapp, mit der Musiker:innen Tempo und Takt einstellen, Übesessions zeitlich begleiten und ihren Übungsfortschritt bei Bedarf lokal festhalten können. Die Bedienung soll ohne Einarbeitung verständlich sein.

## Zielgruppe

Musiker:innen und Lernende, die ein schnell erreichbares Metronom für ihr tägliches Üben benötigen – vom gelegentlichen Einsatz bis zur regelmäßigen Fortschrittskontrolle.

## Funktionale Anforderungen

### Metronom

- Das Tempo lässt sich in BPM einstellen und wird gut sichtbar angezeigt.
- Das Tempo kann über eine Eingabe sowie über „langsamer“ und „schneller“ angepasst werden.
- Ein klar erkennbarer Start-/Stopp-Schalter steuert den Takt.
- Der erste Schlag eines Takts ist akustisch oder visuell hervorgehoben.
- Taktart und Schläge pro Takt lassen sich einstellen.
- Schläge lassen sich in Achtel, Triolen oder Sechzehntel unterteilen; Zwischenklicks sind leiser als der Grundschlag.
- Die Klicklautstärke lässt sich einstellen und wird lokal gespeichert; der Klang bleibt unverändert.
- Voreingestellte Übungen umfassen Rhythmuspyramide, Achtel-, Triolen- und Sechzehntel-Flow sowie Akzentwechsel.
- Die Rhythmuspyramide wechselt alle vier Takte von Vierteln über Achtel und Triolen zu Sechzehnteln und anschließend zurück.
- Die Oberfläche zeigt den aktuellen Schlag und gibt ein deutliches Taktsignal.
- Das Metronom funktioniert auch auf schmalen Bildschirmen.

### Übesession-Timer

- Vor einer Session wird die gewünschte Dauer in Minuten eingestellt.
- Mit dem Start des Metronoms beginnt gleichzeitig der Countdown der Übesession.
- Der Countdown lässt sich pausieren, fortsetzen und vorzeitig beenden.
- Bei 0 stoppt das Metronom automatisch und die Session wird gespeichert.
- Beim vorzeitigen Beenden wird die tatsächlich geübte Dauer festgehalten.
- Optionales Tempo-Training erhöht das Tempo standardmäßig alle vier Takte um 1 BPM; Abstand und Steigerung sind einstellbar, die Steigerung endet am gewählten Zieltempo.

### Lokal gespeicherte Sessions

- Beendete Sessions können auf dem Gerät gespeichert werden, ohne Benutzerkonto oder Server.
- Ein Eintrag enthält den Sessionnamen, Datum, Dauer, Übung sowie Start- und Endtempo.
- Eine einfache Übersicht zeigt vergangene Sessions und die insgesamt geübte Zeit.
- Einträge können gelöscht werden.
- Der Übeverlauf kann als JSON-Datei exportiert und später wiederhergestellt werden.
- Beim Import werden vorhandene Sessions beibehalten und doppelte IDs übersprungen.
- Die App weist darauf hin, dass lokale Daten an den verwendeten Browser und das Gerät gebunden sind.

## Bedienungs- und Qualitätsanforderungen

- Die wichtigsten Aktionen – Tempo und Übedauer einstellen sowie das Metronom starten – sind direkt auf der Hauptansicht erreichbar.
- Bedienelemente haben verständliche Beschriftungen und ausreichend große Klick- bzw. Touch-Flächen.
- Statusänderungen wie „läuft“, „pausiert“ und „Session beendet“ sind klar erkennbar.
- Die App ist per Tastatur bedienbar und berücksichtigt ausreichende Kontraste.
- Die Benutzeroberfläche startet in der bevorzugten Browsersprache (Deutsch oder Englisch) und kann jederzeit manuell umgestellt werden; die Auswahl wird lokal gespeichert, Standortdaten werden nicht erhoben.
- Das Metronom hält das eingestellte Tempo möglichst gleichmäßig; die Taktsteuerung soll nicht von der Dauer einzelner Audio-Wiedergaben abhängen.
- Die App benötigt für die Grundfunktionen keine Anmeldung.

## Vorgeschlagener Umfang

### Erste Version (MVP)

1. BPM einstellen, Unterteilung oder Rhythmusübung wählen und Metronom starten/stoppen.
2. Taktart wählen und den ersten Schlag eines Takts hervorheben.
3. Übesession starten, pausieren und beenden.
4. Abgeschlossene Sessions lokal speichern und als einfache Liste anzeigen.
5. Layout für Desktop und Smartphone.

### Lokal starten

Die App benötigt keine Installation und keinen Build-Schritt. `index.html` in einem aktuellen Browser öffnen. Übesessions werden im lokalen Browserspeicher abgelegt und sind nicht mit anderen Browsern oder Geräten synchronisiert.

## Datenschutz und Sicherheit

- Die App überträgt Übesessions nicht an einen Server. Der lokale Browserspeicher ist jedoch nicht verschlüsselt und kann von Personen mit Zugriff auf dasselbe Browserprofil bzw. Gerät eingesehen werden.
- Sessionnamen und Übeverlauf sollten keine vertraulichen Informationen enthalten. Exportierte JSON-Dateien enthalten den gesamten Übeverlauf und sollten entsprechend geschützt werden.
- Beim Import prüft die App Format und Sessionfelder, führt Daten zusammen und stellt importierte Texte als Text dar. Ungültige Dateien ersetzen den vorhandenen Verlauf nicht.

### Mögliche spätere Erweiterungen

- Session-Notizen sowie Instrument- und Stückangaben.
- Auswertungen wie Übezeit pro Woche oder Tempoverlauf.

## Abnahmekriterien

- Nutzer:innen können das Metronom ohne zusätzliche Einrichtung starten und das Tempo während des Betriebs ändern.
- Die Taktbetonung wiederholt sich passend zur gewählten Taktart.
- Eine pausierte Session zählt während der Pause keine zusätzliche Zeit.
- Nach dem Beenden bleibt eine gespeicherte Session nach einem Neuladen der App verfügbar.
- Sessions lassen sich gezielt löschen; die Anzeige der gesamten Übezeit wird entsprechend aktualisiert.
- Die Kernbedienung ist auf Desktop und Smartphone nutzbar.
