# TechSupport | PCSupport.art

Eine responsive, statische Mehrseiten-Website für TechSupport auf **pcsupport.art**. Sie verwendet HTML, CSS und JavaScript ohne Build-Schritt oder zusätzliche Bibliotheken.

## Projektdateien

- `index.html` – Startseite
- `services.html` – IT-Support-Leistungen
- `wissen.html` – durchsuchbare und filterbare Anleitungen
- `about.html` – Über Gian und TechSupport
- `kontakt.html` – Kontaktdaten und Formular zum Vorbereiten einer Support-E-Mail
- `faq.html` – durchsuchbare häufige Fragen
- `rechtliches.html` – Impressum und Datenschutzhinweise
- `404.html` – Fehlerseite für statische Hosts wie GitHub Pages
- `styles.css`, `script.js` – Gestaltung und Interaktionen
- `hero-photo.jpg`, `support-photo.jpg` – lokal eingebundene Bilder
- `robots.txt`, `sitemap.xml`, `CNAME` – Suchmaschinen- und Domainkonfiguration

## Lokal in Visual Studio Code öffnen

1. In Visual Studio Code **Datei → Ordner öffnen…** wählen und den Projektordner `TechSupportWebsite` öffnen.
2. `index.html` im Browser öffnen oder in VS Code die Erweiterung **Live Server** verwenden.
3. Über die Navigation die übrigen Seiten öffnen. Für die Navigation, Suche, Filter und das Kontaktformular JavaScript aktiviert lassen.

Es ist kein Paketmanager und kein Build-Schritt erforderlich.

## Auf GitHub Pages veröffentlichen

1. Den Inhalt dieses Ordners in das Stammverzeichnis eines GitHub-Repositories hochladen.
2. Im Repository **Settings → Pages** öffnen und als Quelle den gewünschten Branch sowie dessen Stammverzeichnis (`/`) wählen.
3. Nach dem GitHub-Pages-Build die bereitgestellte `github.io`-Adresse prüfen.
4. Für **pcsupport.art** die Domain im Pages-Bereich als benutzerdefinierte Domain eintragen. Die Datei `CNAME` enthält bereits `pcsupport.art`.
5. Beim Domainanbieter die DNS-Einträge entsprechend der aktuellen GitHub-Pages-Anleitung setzen. Nach erfolgreicher DNS-Prüfung HTTPS in den Pages-Einstellungen aktivieren.

Die DNS-Änderungen müssen beim Domainanbieter vorgenommen werden; die Website-Dateien allein veröffentlichen oder konfigurieren die Domain nicht. GitHub Pages kann statische Dateien ausliefern, stellt aber für diese Website kein Backend bereit.

## Kontaktformular

Das Formular sendet keine Anfrage an einen Server und speichert keine Formulardaten. Es erstellt auf dem Gerät der besuchenden Person einen `mailto:`-Entwurf an `abceww@proton.me`. Die Person muss den Entwurf in ihrem Mailprogramm selbst prüfen und senden. Der direkte E-Mail-Link ist zusätzlich verfügbar.

## Bilder

Die Bilder werden lokal aus dem Projektordner geladen. Die Originalfotos stammen von Unsplash: [Foto 1](https://images.unsplash.com/photo-1516321318423-f06f85e504b3) und [Foto 2](https://images.unsplash.com/photo-1522202176988-66273c2fd55f). Die Bilddateien müssen beim Veröffentlichen mit hochgeladen werden.
