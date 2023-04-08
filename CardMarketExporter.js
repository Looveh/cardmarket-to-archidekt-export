const fs = require("fs");
const HTMLParser = require("node-html-parser");

class CardMarketExporter {
  get SETS() {
    return {
      "Revised": "3ED",
      "Fallen Empires": "FEM",
      "Fourth Edition": "4ED",
      "Ice Age": "ICE",
      "Chronicles": "CHR",
      "Mirrodin": "MRD",
      "Urza's Saga": "USG",
      "Urza's Legacy": "ULG",
      "Urza's Destiny": "UDS",
      "Mercadian Masques": "MMQ",
      "Nemesis": "NEM",
      "Mirage": "MIR",
      "Visions": "VIS",
      "Weatherlight": "WTH",
      "Tempest": "TMP",
      "Sixth Edition": "6ED",
      "Scourge": "SCG",
      "Darksteel": "DST",
      "Fifth Dawn": "5DN",
      "Champions of Kamigawa": "CHK",
      "Ninth Edition": "9ED",
      "Ravnica: City of Guilds": "RAV",
      "Khans of Tarkir": "KTK",
      "Aether Revolt": "AER",
      "Explorers of Ixalan": "E02",
      "Dominaria": "DOM",
      "Commander 2018": "C18",
      "Ravnica Allegiance": "RNA",
      "War of the Spark": "WAR",
      "Throne of Eldraine": "ELD",
      "Theros Beyond Death": "THB",
      "Commander: Ikoria": "IKO",
      "Zendikar Rising": "ZNR",
      "Time Spiral": "TSP",
      "Time Spiral Remastered": "TSR",
      "Strixhaven: School of Mages": "STX",
      "Commander: Strixhaven": "C21",
      "Adventures in the Forgotten Realms": "AFR",
      "Commander: Kamigawa: Neon Dynasty": "NEC",
      "Streets of New Capenna": "SNC",
      "Streets of New Capenna: Extras": "SNC",
      "Commander: Streets of New Capenna": "NCC",
      "Dominaria United": "DMU",
      "Dominaria United: Extras": "DMU",
      
    }
  };

  parseSet(setName) {
    const set = this.SETS[setName];

    if (!set) {
      throw new Error(`Unknown set: ${setName}`);
    }

    return set;
  }

  load(filename) {
    const fileContent = fs.readFileSync(filename, "utf8");

    this.dom = HTMLParser.parse(fileContent);
  }

  parse() {
    const table = this.dom.querySelector(".product-table");
    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    this.result = [];

    for (const row of rows) {
      const name = row.getAttribute("data-name");
      const expansionName = row.getAttribute("data-expansion-name");
      const amount = row.getAttribute("data-amount");

      const set = this.parseSet(expansionName);

      this.result.push({
        name,
        set,
        amount,
      });
    }
  }

  dump(filename) {
    if (!this.result) {
      return;
    }

    let output = "";

    for (const item of this.result) {
      output += `${item.amount}x ${item.name} (${item.set})\n`;
    }

    fs.writeFileSync(filename, output, "utf8");
  }
}

module.exports = { CardMarketExporter };
