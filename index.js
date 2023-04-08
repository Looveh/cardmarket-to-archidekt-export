const { CardMarketExporter } = require("./CardMarketExporter.js");

const inputFilename = process.argv[2];
const outputFilename = process.argv[3];

if (!inputFilename || !outputFilename) {
  console.log("Usage: node index.js <input file> <output file>");
  process.exit(1);
}

const exporter = new CardMarketExporter();

exporter.load(inputFilename);
exporter.parse();
exporter.dump(outputFilename);
