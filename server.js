const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { Poppler } = require("node-poppler");
const { parseText, downloadCsv } = require("./utils");

const app = express();
const port = process.env.PORT || 5000;
const tempPath = path.join(__dirname, "/uploads");
const outputPath = path.join(__dirname, "/outputs");
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    if (!fs.existsSync(tempPath)) {
      fs.mkdir(tempPath, (err) => cb(err, tempPath));
    }
    cb(null, tempPath);
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage }).single("files");
const poppler = new Poppler("/usr/local/Cellar/poppler/20.11.0/bin");
const options = {
  firstPageToConvert: 2,
  maintainLayout: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.post("/upload", upload, async (req, res) => {
  const file = req.file;
  // const popplerResult = await poppler.pdfToHtml(file.path, options);
  // console.log("pdf to html...", popplerResult);
  await poppler.pdfToText(file.path, outputPath, options);

  res.sendStatus(200);
});

app.get("/output", (req, res) => {
  try {
    const data = fs.readFileSync("outputs", "utf8");
    const { table } = parseText(data);
    res.json({ success: true, data: table });
  } catch (err) {
    res.json({ success: false, data: err });
  }
});

app.post("/export-csv", (req, res) => {
  try {
    const data = fs.readFileSync("outputs", "utf8");
    const { csvData } = parseText(data);
    downloadCsv(csvData, res);
  } catch (err) {
    console.log("err", err);
  }
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
