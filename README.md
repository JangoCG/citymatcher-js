## Meine Lösung Starten

```bash
node dataAnalyser.js
```

# JavaScript Task Challenge

## Zu lösendes Problem

Bitte erstelle eine variable Datenauswertung, die mit einer Daten- (data.json) und einer Anweisungsdatei (operations.json) beliefert werden und eine Ausgabedatei (output.json) erzeugen soll. Alle Dateien liegen in einem JSON-Format vor. Der Aufbau der Dateien wird nicht durch ein Schema vorgegeben und ist nur anhand der Beispieldateien dokumentiert.

Die Eingabedaten sind in einem einfachen Format gehalten: Ein "cities" Array enthält mehrere Objekte, die eine variable Anzahl von Properties enthalten können. In unserem Beispiel hat jedes „city“-Objekt drei Properties. Eine Property ist immer vorhanden, diese heißt „name“ und wird zur Filterung benutzt.

Die Anweisungen sind ähnlich aufgebaut. Ein Array namens „operations“ enthält einzelne „operation“-Objekte. Die Operation-Objekte enthalten fünf Properties:

- name - Der für die Ausgabe zu benutzende Name.
- type - Ob das gewählte Attribut ein Kinder-Knoten oder ein Attribut ist.
- func - Die Funktion, die ausgewertet werden soll, dies kann „min“, „max“, „sum“ oder „average“ sein.
- attrib – Name der auszuwertenden Property.
- filter - Ein regulärer Ausdruck, der auf die „name“-Propertie der „city“ angewandt werden soll. Nur solche „city“s, die dem regulären Ausdruck entsprechen sollen in die Auswertung aufgenommen werden.

Die Ausgabe besteht aus einem „results“-Array und darunter einzelnen „result“-Objekten. Jedes „result“ hat eine Property „name“, die den Namen der entsprechenden „operation“ entnommen ist. Als weitere Property enthält das "result"-Objekt eine Property value in dem das Ergebnis der Berechnung steht.

Angehängt finden Sie drei Dateien, die eine solche Auswertung vornehmen.

Programmiert werden soll eine Implementierung mit Hilfe von JavaScript, bei der alle Standard-Bibliotheken der von Ihnen verwendeten Sprache benutzt werden dürfen. Die Dateinamen dürfen fest in das Programm eingebaut werden. Gleitkommazahlen sollen mit genau zwei Nachkommastellen ausgegeben werden.

## Mitgelieferte Dateien

Zum Lösen des Problems werden folgende Dateien geliefert:

- data.json Beispielhafte Eingabe-Daten
- operations.json Beispiel für Operationen, die berechnet werden sollen.
- results.json Die Ergebnisse für die mitgelieferten Beispiel-Daten.

## Hinweise zur Abgabe

Um das Ergebnis uns zur Verfügung zu stellen, erstelle bitte einen Fork und sende uns die URL mit deinen Ergebnissen an: alex.lizenberg@outletcity.com
