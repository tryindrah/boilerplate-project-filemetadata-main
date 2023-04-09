var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
const multer = require("multer")
const upload = multer({dest: "public/files"})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single("upfile"), function (req, res){
  if(req.file){
    const file = req.file;
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  }else{
    res.json({ error: "No File Uploaded"})
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
