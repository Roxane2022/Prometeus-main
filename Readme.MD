# Beispielprojekt für den Kurs

Das Projekt soll viele Inhalte, die im Kur sunterrichtet wurden zusammenfassen und in einem Beispielprojekt darstellen. Das Projekt soll auch als Vorlage für die Abschlussprojekte dienen.

# Inhaltsverzeichnis (TOC)

- [Beispielprojekt für den Kurs](#beispielprojekt-für-den-kurs)
- [Inhaltsverzeichnis (TOC)](#inhaltsverzeichnis-toc)
- [Überblick über das Projekt](#überblick-über-das-projekt)
  - [(Primäre) Interaktionsmöglichkeit für den Benutzer](#primäre-interaktionsmöglichkeit-für-den-benutzer)
  - [Backend zur Verarbeitung der Benutzereingaben](#backend-zur-verarbeitung-der-benutzereingaben)
  - [Exporter zur Bereitstellung von Metriken](#exporter-zur-bereitstellung-von-metriken)
  - [Monitoring und Alerting](#monitoring-und-alerting)
- [Zugriff auf die Systeme](#zugriff-auf-die-systeme)
- [Starten des Projekts](#starten-des-projekts)
  - [Vorbereitung](#vorbereitung)
  - [Starten](#starten)
- [Weiterführende Informationen](#weiterführende-informationen)
- [Fehlende Inhalte](#fehlende-inhalte)

# Überblick über das Projekt

<image src='images/readme/Systemdiagramm.png' width="100%" style="background-color:#ffffff80;border-radius:5%">

Das Projekt besteht aus vier Teilen:

1. Blau - (Primäre) Interaktionsmöglichkeit für den Benutzer
2. Grün - Backend zur Verarbeitung der Benutzereingaben
3. Rot - Exporter zur Bereitstellung von Metriken
4. Orange - Monitoring und Alerting

## (Primäre) Interaktionsmöglichkeit für den Benutzer

Der Benutzer kann mittels Heimdall zu allen verfügbaren Systemen navigieren. Es ist die erste Anlaufstelle für den Benutzer.
Primär wird der Endnutzer nur mit Heimdall, Grafana und dem Frontend interagieren. Es besteht weiterhin die Möglichkeit, dass ein Nutzer zur Administration der PostgreSQL Datenbank auf die pgAdmin Oberfläche zugreift.

## Backend zur Verarbeitung der Benutzereingaben

Das Backend besteht aus einer Node.js Applikation, die mit Express.js implementiert wurde. Die Applikation stellt eine REST API zur Verfügung, die von der React App genutzt wird. Die Applikation ist in der Lage, die Daten in einer PostgreSQL Datenbank zu speichern und zu verarbeiten. Weiterhin dient Redis als Caching Layer für die Datenbank. Die Node.js dient gleichzeitig als Api-Gateway für einen beispielhaften Microservice, der ebenfalls eine Node.js Applikation ist. Die bereitgestellte Api ist mittels Swagger dokumentiert und kann direkt aufgerufen werden.

## Exporter zur Bereitstellung von Metriken

Die Exporter greifen direkt Metriken der Services ab und stellen diese zur Verfügung. Das Node-Backend stellt ebenfalls Metriken zur Verfügung.

## Monitoring und Alerting

Die Metriken werden von Prometheus gesammelt und in Grafana visualisiert. Alertmanager wird genutzt, um bei bestimmten Ereignissen eine Benachrichtigung zu versenden.

# Zugriff auf die Systeme

| System                | URL                            | Icon                                                           |
| --------------------- | ------------------------------ | -------------------------------------------------------------- |
| Heimdall              | http://localhost               | <image src='images/readme/Heimdall.svg' style="width:20px;">   |
| Grafana               | http://localhost:3001          | <image src='images/readme/Grafana.png' style="width:20px;">    |
| React App             | http://localhost:8080          | <image src='images/readme/React.png' style="width:20px;">      |
| pgAdmin 4             | http://localhost:5050          | <image src='images/readme/Postgres.png' style="width:20px;">   |
| Node.js App           | http://localhost:3000          | <image src='images/readme/NodeJS.png' style="width:20px;">     |
| Node.js App - Swagger | http://localhost:3000/api-docs | <image src='images/readme/NodeJS.png' style="width:20px;">     |
| Prometheus            | http://localhost:9090          | <image src='images/readme/prometheus.png' style="width:20px;"> |
| Prometheus - Targets  | http://localhost:9090/targets  | <image src='images/readme/prometheus.png' style="width:20px;"> |
| Prometheus - Rules    | http://localhost:9090/rules    | <image src='images/readme/prometheus.png' style="width:20px;"> |
| Prometheus - Alerts   | http://localhost:9090/alerts   | <image src='images/readme/prometheus.png' style="width:20px;"> |
| Alertmanager          | http://localhost:9093          | <image src='images/readme/prometheus.png' style="width:20px;"> |

Hinweis: Fürs Development ist es möglich die Ports der einzelnen Services in der Docker-Compose Datei anzupassen.

# Starten des Projekts

## Vorbereitung

In der Docker-Compose Datei muss im pgadmin Service die Variable `PGADMIN_DEFAULT_EMAIL` angepasst werden. Die Variable `PGADMIN_DEFAULT_PASSWORD` kann ebenfalls angepasst werden.

## Starten

Das Projekt wird mit folgenden Befehlen gestartet: `docker compose up -d`

# Weiterführende Informationen

Der Nutzername, Passwort und die Datenbank für die PostgreSQL Datenbank können in der Datei `docker-compose.yml` angepasst werden. Sie sind standardmäßig auf `postgres` gesetzt. Bei Änderungen muss die Node.js Applikation ebenfalls angepasst werden.

Für die Anmeldung in der pgAdmin Oberfläche, muss das Passwort zurückgesetzt werden. Dementsprechend muss Zugriff auf die angegebene E-Mail Adresse bestehen.

Die Zugangsdaten für Grafana sind `admin` für den Username und das Passwort. Es wird empfohlen, das Passwort zu ändern.

Gemountete Volumes sind hilfreich für die Entwicklung. Sie können in der Docker-Compose Datei angepasst werden. Schlussendlich sollten die Volumes entfernt werden, da sie nicht für die Produktion geeignet sind. Hierfür sollte eine Dockerfile erstellt bzw. angepasst werden. Die Docker-Compose Datei sollte ebenfalls angepasst werden.

# Fehlende Inhalte

Folgende Inhalte wurden im Unterricht behandelt, sind aber nicht im Projekt enthalten:

- CI/CD Pipelines
  - Jenkins
  - GitHub CI
- Terraform
- Ansible
