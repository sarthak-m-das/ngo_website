const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const courses = require('./data')


const connectDB = require('./config/db')
const mongoose = require('mongoose');

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
const Course = require("./models/courses");
const Video = require("./models/videos");
connectDB();

const PORT = process.env.PORT || 3000

app.get('/',(req,res)=> res.redirect('/home'))

app.get('/home',(req,res)=>{
    res.render('home');
})

app.get('/courses',async(req,res)=>{
    let courses = await Course.find()
    .populate('videos')
    res.render('courses',{courses:courses});
})

app.get('/course/:id',async(req,res)=>{
    let course = await Course.findById(req.params.id).populate('videos')
    res.render('course-single',{course:course});
})

app.get('/services',(req,res)=>{
    res.render('services');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/causes',(req,res)=>{
    res.render('causes');
})

app.get('/admin',(req,res)=>{
    res.render('admin');
})

app.post('/login',(req,res)=>{

    if(req.body.username === 'sarthak' && req.body.pass == '54321')
    res.redirect('/dashboard')
    else
    res.redirect('/login')
})

app.get('/dashboard',async(req,res)=>{
    let courses = await Course.find().populate('videos')
    res.render('dashboard',{courses:courses});
})

app.get('/build',(req,res)=>{
    res.render('build');
})

app.post('/course-details',async(req,res)=>{

    var course = new Course({
        courseTitle: req.body.title,
        Description: req.body.desc
    })
    await course.save();

    res.redirect(`/edit/${course['_id']}`);
})

app.get('/edit/:id',async(req,res)=>{
    let course = await Course.findById(req.params.id)
    .populate('videos');
    res.render('edit',{course:course,id:req.params.id})
})

app.post('/add-video/:id',async(req,res)=>{
    let course = await Course.findById(req.params.id)
    let video = new Video({
        title: req.body.title,
        url: req.body.url
    })
    await video.save();
    course.videos.push(video['_id']);
    await course.save();

    res.redirect(`/edit/${req.params.id}`);
})

app.post('/remove-video/:course_id/:video_id',async(req,res)=>{
    let course = await Course.findById(req.params.course_id)

    let video = await Video.findByIdAndDelete(req.params.video_id)
    course.videos = course.videos.filter((v)=>{return v.toString() !== req.params.video_id})
    await course.save();

    res.redirect(`/edit/${req.params.course_id}`);
})

app.listen(PORT, ()=> console.log('Server running on port '+PORT))