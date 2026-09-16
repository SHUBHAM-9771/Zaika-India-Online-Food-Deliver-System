import multer from "multer";

const Storage = multer.diskStorage({
  destination: "uplode/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export default Storage;
