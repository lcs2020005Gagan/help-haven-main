const mongoose=require("mongoose")
const usersSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
about:{
    type:String,
},
profileImg:{
    type:String,
    required:true,
},
bannerImg:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now().toGMTString
},
cardId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
    default:[""]
  }],
likedCards:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
    default:[""]
  }],
postedComments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
    default:[""]
  }],
bookmarkedCards:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
    default:[""]
  }],
followers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default:[""]
  }],
following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default:[""]
  }],
  donationsGiven:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
    default:[""]
  }],
  retweetedCards:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cards',
    default:[""]
  }],
});
const users=mongoose.model("users",usersSchema);
users.createIndexes();
module.exports=users