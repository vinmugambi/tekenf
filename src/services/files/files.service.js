// Initializes the `files` service on path `/files`
const { Files } = require("./files.class");
const createModel = require("../../models/files.model");
const hooks = require("./files.hooks");

const path = require("path");
const multer = require("multer");
const { authenticate } = require("@feathersjs/express");
const uuid = require("uuid");
const { PDFImage } = require("pdf-image");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5e6,
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".jpeg", ".jpg", ".png", ".pdf"].includes(ext)) {
      return cb(new Error(415));
    }
    cb(null, true);
  },
}).single("file");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/files",
    authenticate("jwt"),
    function (req, res, next) {
      upload(req, res, function (err) {
        if (err) {
          if (err.message == 415) {
            return res.status(415).send({
              message: "Only still images and pdf are allowed",
              code: 415,
              name: "Unsupported Media Type",
              errors: []
            });
          } else {
            return res.status(500).send({
              message: "File storage error, your file could be too large",
              errors: [],
            });
          }
        }
        next();
      });
    },
    async function (req, res, next) {
      if (req.method == ("POST" || "PATCH")) {
        if (path.extname(req.file.filename) ===".pdf"){
          const pdfThumb=new PDFImage(app.get("public")+"/uploads/"+req.file.filename);
          const thumbnail = await pdfThumb.convertPage(0);

          req.body={...req.body, thumbnail:  path.basename(thumbnail)};
        }
        req.body = { ...req.body, filename: req.file.filename };
      }
      next();
    },
    new Files(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("files");

  service.hooks(hooks);
};
