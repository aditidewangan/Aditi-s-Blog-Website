//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const aboutContent = "I'm Aditi Dewangan an Electrical Engineer 3rd year undergrad student by education and I'm also a Web Developer. I like to develope and manage the website. I created many websites and also I'm a Competitive programmer. I earned 6⭐ gold badge in Problem Solving in HackeRank.I spend my childhood in Chhattisgarh and persuing my Bachelor's of Engineering degree from Shri Shankaracharya Technical Campus Bhilai, Chhattisgarh. I'm also taking a part in various programs and living the beautiful journey of college😊.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const contactSchema = {
  name : String,
  email : String,
  phone : String,
  message : String
};

const Post = mongoose.model("Post", postSchema);
const Contact = mongoose.model("Contact", contactSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post("/contact", function(req,res){

  const contact = new Contact({
  name : req.body.postName,
  email : req.body.postEmail,
  phone : req.body.postPhone,
  message : req.body.postMessage,
});

contact.save(function(err){
  if(!err){
    res.status(201).render("contact");
  }
});

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
