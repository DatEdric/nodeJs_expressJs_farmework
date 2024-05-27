const express = require('express');
const exphbs = require('express-handlebars').engine;
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/resources/public')));


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(morgan('combined'));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources/views'));

app.get('/',(req,res) => {res.render('home')});
app.get('/news',(req,res) => {res.render('news')});
app.get('/shops',(req,res) => {res.render('shops')});
app.get('/product',(req,res) => {res.render('productinfo')});
app.post('/product',(req,res) => {
    console.log(req.body)
    res.render('')});




app.listen(port, () => { console.log(`Example app listening on port ${port}`)});