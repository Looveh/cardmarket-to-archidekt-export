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
