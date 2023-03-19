const express=require("express")
const bodyParser = require("body-parser");
const User=require("../models/Users")
const Card=require("../models/Cards")
let fetchuser=require("../middleware/fetchuser")
const router=express.Router()
const app =express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const secretKey="helloworld"
var jwt=require("jsonwebtoken");
// const fetchmentor = require("../middleware/fetchmentor");
// let success=false



//start


//create user
router.post('/createuser',
[body('name','Enter a valid name').isLength({min:1}),
  body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
  body('profileImg'),
  body('bannerImg'),
  body('about'),
 
 
],
 async (req, res) => {
      success=false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        console.log(user);
        if(user)
        {
            return res.status(400).json({ success,errors: "Email is alerady registered with helphub" });

        }
        else{
            var salt =await bcrypt.genSaltSync(10);
var secpassword =  await bcrypt.hashSync(req.body.password, salt);
console.log(secpassword);
       user=await  User.create({
            name:req.body.name,
          email: req.body.email,
          profileImg: req.body.profileImg,
          bannerImg: req.body.bannerImg,
          email: req.body.email,
          password: secpassword,
          about:req.body.about,
         })
        console.log("user ",user)
        // console.log(user);
        var authtoken=await jwt.sign({id:user.id},secretKey)
        console.log(authtoken);
        // console.log(authtoken)
        success=true
        res.json({success,authtoken});
        success=false;
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
res.send("hello");
  }
);


//add friend
router.post('/addfriend', fetchuser, [
  body('user_id'),
 ], async (req, res) => {
      try {
          const user_id = req.body.user_id;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $push:{
              following:user_id
            }
          })
          await User.findOneAndUpdate({
            _id:user_id
          },{
            $push:{
              followers:req.id
            }
          })
          const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

 



//getuser
router.get('/getuser',fetchuser,
  async (req, res) => {
    await User.find({_id:req.id})
  .select("-password")
  .populate("followers")
  .populate("following")
  .exec()
  .then(p=>{
      res.status(200).json(p)
  })
  .catch(error=>console.log(error));
  });

//get all user
router.get('/gettopdonors',
  async (req, res) => {
    await User.find().sort({donationsGiven:-1}).limit(3)
  .select("-password")
  .exec()
  .then(p=>{
      res.status(200).json(p)
  })
  .catch(error=>console.log(error));
  });

  //getuser with specific id
  router.get('/getuserwithid/:id', async (req, res) => {
    try {
        let user =await User.find({_id:req.params.id})
        if(!user)
        {
            res.status(498).send("User not found");
        }
       user=await User.findById(req.params.id)
       .populate("followers")
       .populate("following")
       .exec()
       .then(p=>{
           res.status(200).json(p)
       })
       .catch(error=>console.log(error))
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//update user
router.post('/updateuserprofileimg', fetchuser, [
  body('profileImg'),
 ], async (req, res) => {
      try {
          const profileImg = req.body.profileImg;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              profileImg:profileImg
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })
router.post('/updateuserlikedcards', fetchuser, [
  body('likedCards'),
 ], async (req, res) => {
      try {
          const likedCards = req.body.likedCards;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              likedCards:likedCards
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

router.post('/updateusercardid', fetchuser, [
  body('cardId'),
 ], async (req, res) => {
      try {
          const cardId = req.body.cardId;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              cardId:cardId
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })
router.post('/updateuserbookmarkedCards', fetchuser, [
  body('bookmarkedCards'),
 ], async (req, res) => {
      try {
          const bookmarkedCards = req.body.bookmarkedCards;
         await User.findOneAndUpdate({
            _id:req.id
          },{
            $set:{
              bookmarkedCards:bookmarkedCards
            }
          })
         const user=await User.find({_id:req.id});
          res.json(user);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })



  //getuser
router.get('/getuser2',fetchuser,
async (req, res) => {
  await User.find({_id:req.id})
.select("-password")
.populate("cardId")
.exec()
.then(p=>{
    res.status(200).json(p)
})
.catch(error=>console.log(error));
});


  //login user
router.post('/loginuser',
[ body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({ success,errors: "wrong email" });
        }
        else{
           var passwordcompare=await bcrypt.compare(req.body.password,user.password)
           if(!passwordcompare)
           {
            return res.status(400).json({success, errors: "wrong passwrod" });
           }

        var authtoken=await jwt.sign({id:user.id},secretKey)
        // console.log(authtoken)
        // setsuccess(true);
        success=true;
        res.json({success,authtoken});
        success=false;  
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
   }
)


  

module.exports=router
