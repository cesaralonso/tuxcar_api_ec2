const multer = require('multer');
const dir = './public/uploads/';
const async = require('async');
const connection = require('../config/db-connection');

ImageSaving = {}

ImageSaving.save = (req, res, options, cb) => {
    async.waterfall([
        cb => {
            setFileEnviroment(req, res, options, cb)
        },
        fileNameToStore => {
            storeData(fileNameToStore, cb)
        }
    ],
    (error, data) => {
        return cb(null, data)
    })
}

storeData = (fileNameToStore, cb) => {
    if ( !fileNameToStore ) return cb({ error: 'Not filename provided'})
    if ( !connection ) return cb({ error: 'Connection refused '})

    connection.query(`
    INSERT INTO image SET src = ?`, [fileNameToStore], (error, result) => {
        error ? cb(error) : cb(null, result)
    })
}

setFileEnviroment = (req, res, options, cb) => {
    let fileNameToStore = '';
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, options.dir || dir)
      },
      filename: (req, file, cb) => {
        // Gets the whole file name
        const originalFileName = file.originalname.split('.');
        // Gets the name of the file
        let fileName = originalFileName[0];
        // Gets the extension of the file
        const extension = originalFileName[1];
        // Limits the number of characters
        fileName = fileName.toString().substring(0, 30);
        // Replace whitespaces for dashes
        slugify( fileName )
          .then( newFileName => {
              fileNameToStore =  `${newFileName}-${Date.now()}.${extension}`;
              cb(null,  fileNameToStore)
            })
          .catch( error => cb(error));
      }
    })

    const upload = multer({ storage: storage }).any();
    
    upload(req, res, err => {
        if (err) return cb(err);
        
        return cb(null, fileNameToStore)
    });
}


/** 
 * Replace whitespaces for dashes
 */
slugify = ( str ) => {
  return new Promise( (result, reject) => {
    if (str.length > 0) {
      let newStr = ''
      for(let character of str) 
        newStr += character === ' ' ? '-' : character
      result(newStr);
     } else {
       reject('Not a valid string');
     }
  })
}

module.exports = ImageSaving
