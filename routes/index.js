var express = require('express');
var router = express.Router();
var formidable = require('formidable');
//fs is a native module, filesytem
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req, res) => {

  let path = './' + req.query.path;

  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {

      if (err) {

        console.error(err);
        res.status(400).json({error: err});

      } else {

        res.status(200).end(data);

      }

    });

  } else {

    res.status(404).json({error: 'File not found.'})

  }

});

router.delete('/file', (req, res) => {

  //IncomingForm is to get the form
  //uploadDir is the directory
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  //to read the data that is coming
  form.parse(req, (err, fields, files)=>{

    let path = './' + fields.path;

    //existsSync to see if the file exist
    if (fs.existsSync(path)) {

      //to remove the file
      fs.unlink(path, err => {

        if (err) {
          
          res.status(400).json({err});
        
        } else {

          res.json({fields});

        }

      });

    } else {

      res.status(404).json({error: 'File not found.'})
  
    }

  });

});

router.post('/upload', (req, res) => {

  //IncomingForm is to get the form
  //uploadDir is the directory
  //
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  //to read the data that is coming
  form.parse(req, (err, fields, files)=>{

    res.json({
      files
    });

  });

});

module.exports = router;
