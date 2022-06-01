const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ItemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
       
    },
    variation:{
         type:String,
        required:false
    }
});
module.exports=item=mongoose.model('item',ItemSchema);