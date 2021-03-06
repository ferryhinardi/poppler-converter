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
const popplerPath = process.env.POPPLER_PATH;
const poppler = new Poppler(popplerPath);
const options = {
  firstPageToConvert: 2,
  maintainLayout: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (_, res) {
  return res.send("pong");
});

app.post("/upload", upload, async (req, res) => {
  const file = req.file;
  const filename = `file_${Date.now()}`;

  try {
    const result = await poppler.pdfToText(
      file.path,
      `${path.join(outputPath, filename)}`,
      options
    );
    fs.unlinkSync(file.path); // remove tmp file
    res.json({ success: true, data: { result, filename } });
  } catch (err) {
    res.status(500);
    res.json({ success: false, error: err });
  }
});

app.get("/output", (req, res) => {
  const { filename } = req.query;
  let data = "";
  try {
    const filepath = path.join(outputPath, filename);

    if (fs.existsSync(filepath)) {
      data = fs.readFileSync(filepath, "utf8");
    }

    const { table } = parseText(data);
    res.json({ success: true, data: table });
  } catch (err) {
    res.status(500);
    res.json({ success: false, data: err });
  }
});

app.post("/export-csv", (req, res) => {
  const { filename } = req.query;
  try {
    const filepath = path.join(outputPath, filename);
    const data = fs.readFileSync(filepath, "utf8");
    const { csvData } = parseText(data);
    downloadCsv(csvData, res);
    fs.unlinkSync(filepath);
  } catch (err) {
    res.status(500);
    res.json({ success: false, error: err });
  }
});

app.post("/reset-csv", async (req, res) => {
  const { filename } = req.query;
  try {
    const filepath = path.join(outputPath, filename);
    fs.unlinkSync(filepath);
    res.json({ success: true });
  } catch (err) {
    res.status(500);
    res.json({ success: false, error: err });
  }
});

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  console.log(`server is listening on ${port}`);
});
