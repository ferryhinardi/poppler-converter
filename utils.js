const _ = require("lodash");
const stringify = require("csv-stringify");

const reactTableColumn = [
  { Header: "AIR", accessor: "AIR" },
  { Header: "Trnc", accessor: "TRNC" },
  { Header: "Document Number", accessor: "Document Number" },
  { Header: "Issue Date", accessor: "Issue Date" },
  { Header: "Balance Payable", accessor: "Balance Payable" },
];
const csvColumn = [
  "AIR",
  "TRNC",
  "Document Number",
  "Issue Date",
  "Balance Payable",
];
const trncRules = ["TKTT", "EMDA", "EMDS"];
/*
const rules = {
  "NR Code": {
    rule: (val) => {
      if (val.startsWith("NR")) {
        return false;
      }

      return true;
    },
  },
  FOP: {
    rule: (val) => {
      if (new RegExp("[A-Z]{2}").test(val)) {
        return false;
      }

      return true;
    },
  },
  TAX: { join: joinAmount },
  "Taxes, Fees & Charges F&C": { join: joinAmount },
};
*/
function parseText(str) {
  const lines = str.split("\n");
  const linesWithoutSpace = _.remove(lines, (s) => s !== "");
  const result = linesWithoutSpace.reduce((prev, item) => {
    const row = item.split(" ");

    /*
      @description: return row from string output
      Expected Output:
      eg: - ['126','EMDA','1860661394','17MAY20','FVVV','I','CA','894,600','894,600','894,600','0.00','0','0.00','0','894,600']
          - ['+RTDN:','3800938434','1200','EX','0']
    */
    const rowWithoutSpace = _.remove(row, (s) => s !== "");

    // @description: return row with includes @@trncRules ["TKTT", "EMDA", "EMDS"]
    const isRowWithTrncRule = trncRules.some((rule) =>
      rowWithoutSpace.includes(rule)
    );

    if (isRowWithTrncRule) {
      fieldColumn = {};

      for (let i = 0; i < csvColumn.length; i++) {
        const column = csvColumn[i];
        if (column === "Balance Payable") {
          fieldColumn[column] = rowWithoutSpace[rowWithoutSpace.length - 1];
        } else {
          fieldColumn[column] = rowWithoutSpace[i];
        }
      }

      prev.push(fieldColumn);
    }
    return prev;
  }, []);

  return {
    csvData: result,
    table: { column: reactTableColumn, data: result },
  };
}

function downloadCsv(data, res) {
  console.log("data", data);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="' + "download-" + Date.now() + '.csv"'
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma", "no-cache");
  stringify(data, { header: true }).pipe(res);
}
/*
function joinAmount(list, index) {
  const amount = list[index];
  const suffix = list[index + 1];

  if (amount && new RegExp("[A-Z1-9]{2}").test(suffix)) {
    return [amount, suffix].join(" ");
  }

  return null;
}
*/
module.exports = { parseText, downloadCsv };
