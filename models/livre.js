const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LivreSchema = new Schema({
    titre:{
        type:String,
        required:[true,'titre field is required']
    },
    auteur:{
        type:String,
        required:[true,'auteur field is required']
    },
    description:{
      type:String,
      required:[true,'description field is required']
    },
    contenue:{
     type:String,
     required:[true,'contenu field is required'
    ]
}
},
{ timestamps: true ,versionKey: false });

const Livre = mongoose.model('livre', LivreSchema);

module.exports=(Livre);

