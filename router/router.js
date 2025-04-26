import { Router } from "express";
import multer from "multer";
import path from "path";
import { deletebook, editbook, getaddhtml, getedithtml, gethtml, pdfreader, savedata, searchbook, statusbook, updatebook } from "../controller/controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /pdf/; // Allowed file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 50MB
    fileFilter: fileFilter
});

router.get('/', gethtml)

router.get('/add', getaddhtml);

router.get('/edit', getedithtml);

router.post('/adddata', (req, res, next) => {
    upload.single('books')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.redirect('/?msg=fileTooLarge');
        }
      } else if (err) {
        return res.redirect('/?msg=uploadError');
      }
      next(); // No error, move to savedata
    });
  }, savedata);

router.get('/del/:id/:filename', deletebook);

router.get('/edit/:id', editbook);

router.post('/update/:id/:files', (req, res, next) => {
    upload.single('books')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.redirect('/?msg=fileTooLarge');
        }
      } else if (err) {
        return res.redirect('/?msg=uploadError');
      }
      next();
    });
  }, updatebook);

router.get('/status/:id', statusbook);

router.post('/search', searchbook);

router.get('/pdf/:id', pdfreader);

export const routerdata = router;