# Steibis Caddie

Minimalistische Smartphone-Web-App für Runden im Golfclub Oberstaufen-Steibis.

## Lokal testen

```bash
python3 -m http.server 4173
```

Dann im selben WLAN auf dem Smartphone öffnen:

```text
http://<deine-mac-ip>:4173/
```

## Online-Link mit GitHub Pages

1. Auf GitHub ein neues Repository erstellen, z.B. `steibis-break90`.
2. Dieses lokale Projekt in das Repository pushen.
3. In GitHub unter `Settings` -> `Pages` die Source `Deploy from a branch` wählen.
4. Branch `main` und Ordner `/root` auswählen.
5. Nach kurzer Zeit ist die App unter `https://<github-name>.github.io/steibis-break90/` erreichbar.

Wichtig: In einer öffentlich gehosteten Version funktionieren geteilte Rundenlinks auch außerhalb des eigenen WLANs, weil die Rundendaten im Link codiert werden.

## Sicherheit

- Keine API-Keys, Tokens oder `.env`-Dateien ins Repository committen.
- Der Gemini API-Key im Frontend ist nur für lokale Tests gedacht.
- Für produktive Gemini-Nutzung den Backend-Endpunkt mit Umgebungsvariable `GEMINI_API_KEY` verwenden.
- Vor jedem Push kurz prüfen, ob private Daten, Testdaten oder lokale Dateien enthalten sind.
