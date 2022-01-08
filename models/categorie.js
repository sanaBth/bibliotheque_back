const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorieSchema = new Schema({
    nomcategorie:{
        type:String,
        required:[true,'name field is required']
    },listeDesLivres:[{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'livre', 
        required: false
     }]
  
},
{ timestamps: true ,versionKey: false });




const Categorie = mongoose.model('categorie', CategorieSchema);

module.exports=(Categorie);

