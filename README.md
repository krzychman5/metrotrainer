# Taktgefühl – Metronom

Eine schlanke Metronom-Webapp für Rhythmusübungen und zeitlich begrenzte Übesessions. Sie läuft direkt im Browser und speichert den Übeverlauf lokal auf dem Gerät.

## Funktionen

### Metronom und Übungen

- Tempo von 30 bis 240 BPM, einstellbar per Zahlenfeld, Plus/Minus oder Schieberegler.
- Taktarten: 2/4, 3/4, 4/4 und 6/8.
- Unterteilungen: keine, Achtel, Triolen und Sechzehntel.
- Betonter erster Schlag und visuelle Anzeige des aktuellen Takts.
- Lautstärkeregler von 0 bis 100 Prozent; die Einstellung wird lokal gespeichert. Der Metronomklang ist fest.
- Voreingestellte Übungen: Rhythmuspyramide, Achtel-Flow, Triolen-Flow, Sechzehntel-Flow und Akzentwechsel.
- Die Rhythmuspyramide wechselt alle vier Takte zwischen Vierteln, Achteln, Triolen, Sechzehnteln, Triolen und Achteln.

### Übesession und Tempo-Steigerung

- Freier Sessionname; der Standardname ist „Übesession“ bzw. „Practice session“.
- Übedauer von 1 bis 240 Minuten. Der Countdown startet mit dem Metronom und stoppt es bei null.
- Sessions lassen sich pausieren, fortsetzen oder vorzeitig beenden.
- Optionale Tempo-Steigerung alle 4, 8 oder 16 Takte. Die Schrittgröße ist von 1 bis 240 BPM einstellbar; optional kann ein Zieltempo festgelegt werden.

### Übeverlauf und Sicherung

- Beendete Sessions werden mit Name, Datum, Dauer, Übung, Taktart sowie Start- und Endtempo gespeichert.
- Der Verlauf zeigt einzelne Sessions und die insgesamt geübte Zeit; Einträge können gelöscht werden.
- Der Verlauf lässt sich als JSON-Datei exportieren und später wiederherstellen.
- Der Import führt Sessions zusammen, überspringt doppelte IDs und prüft Datei sowie Sessiondaten. Unterstützt werden Dateien bis 5 MB und bis zu 10.000 Sessions.
- Export und Import betreffen den Sessionverlauf, nicht die Lautstärke- oder Spracheinstellung.

### Sprache

Die App startet auf Deutsch oder Englisch passend zur bevorzugten Browsersprache. Die Sprache kann jederzeit manuell geändert werden; die Auswahl bleibt lokal gespeichert. Es werden keine Standortdaten benötigt.

## Lokal starten

Es gibt keine Abhängigkeiten und keinen Build-Schritt. `index.html` in einem aktuellen Browser öffnen. `app.js` und `styles.css` müssen im selben Ordner wie die HTML-Datei liegen. Zum Starten des Metronoms muss der Browser Audio erlauben.

## Web-Bereitstellung

Die App besteht aus statischen Dateien und benötigt weder Backend noch Datenbank. Sie kann daher auf einem statischen Webhost bereitgestellt werden. Beim Wechsel von der lokalen Datei zu einer Website wird der Übeverlauf nicht automatisch übertragen: vorher exportieren und anschließend auf der Website wieder importieren.

Aktuell sind keine Konten, Cloud-Synchronisierung, Werbeanzeigen oder Zahlungsfunktionen eingebaut.

## Datenschutz und Sicherheit

- Der Sessionverlauf bleibt im lokalen Browserspeicher; die App sendet ihn nicht an einen Server.
- Lokale Daten sind nicht verschlüsselt und an Browser sowie Webadresse gebunden. Sessionnamen sollten keine vertraulichen Angaben enthalten.
- Exportdateien enthalten den Übeverlauf im Klartext und sollten entsprechend geschützt werden.
- Importierte Daten werden geprüft und als Text dargestellt; ungültige Dateien ersetzen den vorhandenen Verlauf nicht.
