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
 


  //addcard
  router.post('/addcard', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1}),
    body('briefDescription').isLength({min:1}),
    body('description').isLength({min:1}),
    body('tags'),
    body('image'),
   ], async (req, res) => {
        try {
            const { title,briefDescription, description,tags,image } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const card = new Card({
                title,briefDescription,description, tags,image,author: req.id,
                })
            const savedCard = await card.save()
            await User.findOneAndUpdate({
                _id:req.id
              },{
                $push:{
                    cardId:card
                }
              })
            // res.json(savedCard)
            res.send({success:"success",card:savedCard});
            console.log(req);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    //getallcards
    router.get('/getallcards',async (req,res)=>{
        const cards= Card.find()
         .populate("author")
         .exec()
         .then(p=>{
             res.status(200).json(p)
         })
         .catch(error=>console.log(error));
       })

    //get user specific cards
    router.get('/getusercards',async (req,res)=>{
        const cards= Card.find()
         .populate("author")
         .exec()
         .then(p=>{
             res.status(200).json(p)
         })
         .catch(error=>console.log(error));
       })
     
         //getcard with specific id
         router.get('/getcardwithid/:id',
         async (req, res) => {
            await Card.findById({_id:req.params.id})
    .select("-password")
.populate("author")
.exec()
.then(p=>{
    res.status(200).json(p)
})
.catch(error=>console.log(error));
         });
      
         
     //deletenote
     router.delete('/deletecard/:id', fetchuser, async (req, res) => {
        try {
            let card =await Card.findById({_id:req.params.id});
            console.log("todelete",card)
            if(!card)
            {
                res.status(498).send("card not found");
            }

            card=await Card.findByIdAndDelete(req.params.id);
            res.json({"success":"Note was successfully deleted",card:card});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

     //update user
 router.post('/updateuser', fetchuser, [
    body('card_id'),
   ], async (req, res) => {
        try {
            const card_id = req.body.card_id;
           await User.findOneAndUpdate({
              _id:req.id
            },{
              $push:{
                likedCards:card_id
              }
            })
            await Card.findOneAndUpdate({
              _id:card_id
            },{
              $inc: { priority: 1}
            })
            const user=await User.find({_id:req.id});
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
  
     //upvote
router.post('/upvote', fetchuser, [
    body('card_id'),
   ], async (req, res) => {
        try {
            const card_id = req.body.card_id;
           await User.findOneAndUpdate({
              _id:req.id
            },{
              $push:{
                likedCards:card_id
              }
            })
            await Card.findOneAndUpdate({
              _id:card_id
            },{
              $push:{
                likedBy:req.id
              }
            })
            const user=await User.find({_id:req.id});
            res.json({user:user,success:true});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

     //bookmark
router.post('/bookmark', fetchuser, [
    body('card_id'),
   ], async (req, res) => {
        try {
            const card_id = req.body.card_id;
           await User.findOneAndUpdate({
              _id:req.id
            },{
              $push:{
                bookmarkedCards:card_id
              }
            })
            await Card.findOneAndUpdate({
              _id:card_id
            },{
              $push:{
                bookmarkedBy:req.id
              }
            })
            const user=await User.find({_id:req.id});
            res.json({user:user,success:true});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    


module.exports=router
