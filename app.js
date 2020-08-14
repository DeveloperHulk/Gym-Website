const express = require("express");
const path = require("path");
// const bodyparser = require("body-parser");

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Gym', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    locality: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

//For serving Static files
app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'html');

app.set('/views', path.join(__dirname, 'views'));



app.get('/',function(req,res){
    console.log(req.url);
    res
      .status(200)
      .sendFile(path.join(__dirname, "views", "index.html"));
  });



app.post('/contact', function (req, res) {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        
            res.redirect('/')

    }).catch(() => {
            res.status(400).send("Item was not saved ");
    });
    // res.status(200).render('contact.pug', params);
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})