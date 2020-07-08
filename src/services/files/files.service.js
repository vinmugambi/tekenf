// Initializes the `files` service on path `/files`
const { Files } = require("./files.class");
const createModel = require("../../models/files.model");
const hooks = require("./files.hooks");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5e6,
  },
});


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/files",
    upload.single("file"),
    function (req, res, next) {
      let file= req.file;
      req.body={location: file.path, originalname: file.originalname };
      next();
    },
    new Files(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("files");

  service.hooks(hooks);
};
