const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const courses = require('./data')

const app = express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}));
// app.use("/public", express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 3000

app.get('/',(req,res)=> res.redirect('/home'))

app.get('/home',(req,res)=>{
    res.render('home');
})

app.get('/courses',(req,res)=>{
    res.render('courses',{courses:courses});
})

app.get('/course/:id',(req,res)=>{
    const course = courses.filter((c) => {return c._id === req.params.id})
    res.render('course-single',{course:course[0]});
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

app.listen(PORT, ()=> console.log('Server running on port '+PORT))