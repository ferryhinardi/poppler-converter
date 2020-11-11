const _ = require("lodash");
const stringify = require("csv-stringify");

const reactTableColumn = [
  { Header: "AIR", accessor: "airCode" },
  { Header: "Trnc", accessor: "trncCode" },
  { Header: "Document Number", accessor: "docNumber" },
  { Header: "Balance Payable", accessor: "balancePayable" },
];
const trncRules = ["TKTT", "EMDA", "EMDS"];

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
      const airCode = rowWithoutSpace[0];
      const trncCode = rowWithoutSpace[1];
      const docNumber = rowWithoutSpace[2];
      const balancePayable = rowWithoutSpace[rowWithoutSpace.length - 1];
      prev.push({ airCode, trncCode, docNumber, balancePayable });
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

module.exports = { parseText, downloadCsv };
