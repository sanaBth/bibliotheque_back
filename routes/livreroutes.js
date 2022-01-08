const express = require('express');
const router =  express.Router();
const Livre = require('../models/livre');
const Categorie = require('../models/categorie');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null,  Date.now()+ '-' +file.originalname );
  }
});
var upload = multer({ storage : storage, limits: {
    fileSize: 100000000 // 1000000 Bytes = 1 MB
  },});

  
//getting all livres
router.get('/livres', (req, res) => {
    Livre.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });
 

  //add livre to categorie
  router.post('/add/:idc', upload.single('contenue'),async function(req,res)
  {
        let idcat = req.params.idc;
        try {
         let contenue = req.file.filename
       const livre = new Livre({...req.body,contenue});
       const reslivre =   await livre.save();
        const rescategorie = await Categorie.findByIdAndUpdate(
            idcat,{  $push: {  listeDesLivres: reslivre._id }}
        ,{new : true} 
        )
        res.status(201).json(rescategorie)
        } catch (error) {
        res.status(500).json(error)
        }
});
 
//get one livre
router.get('/details/:id', (req, res) =>
Livre.findOne({
    _id: req.params.id
    }) .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err))
    );

module.exports = router; 