# CardMarket -> Archidekt exporter

Makes it easier to import your CardMarket purchases into Archidekt.

## Installation

```sh
npm i
```

## Usage

Preparation: Go to the CardMarket web page of the order you wish to export (ex. https://www.cardmarket.com/en/Magic/Orders/1107936562). Save the page as .html on your machine.

Run the export script with:

```sh
npm start <input .html file> <output .txt file>
```

Copy and paste the output .txt file's contents into Archidekts importer.

## Room for improvements

* Add more expansion mappings
* Download the export within this script
* Make it a Chrome plugin so that you don't need to run stuff on your machine
* Auto-import in Archidekt
