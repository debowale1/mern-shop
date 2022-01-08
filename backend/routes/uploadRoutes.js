import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const checkFileType = () => {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetypes = filetypes.test(file.mimetypes)

  if(extname && mimetypes){
    return cb(null, true)
  }else{
    cb('Images only')
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
 })

 router.post('/', upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`)
 })

export default router