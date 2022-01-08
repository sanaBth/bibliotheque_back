const express = require('express');
const router =  express.Router();
const Categorie = require('../models/categorie');




//post categorie
router.post('/addcat', (req, res) => {
    let newCat = new Categorie();
    newCat.nomcategorie = req.body.nomcategorie;
   newCat.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });

//getting all categories
router.get('/getcat', (req, res) => {
    Categorie.find({}).populate("listeDesLivres")
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });

  module.exports = router;