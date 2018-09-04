let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const GreetRoutes = require('./greet');
const greetRoutes = GreetRoutes();


app.use(express.static('public'));
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'}));
app.get("/", function (req, res) {

  greetRoutes.GreetLanguage();
  greetRoutes.CountPeople();
  res.render("home");
});

app.use(bodyParser.json());
app.post('/greetings', function(req, res) {

 // get the values from the form (req.body)
 var textInput = req.body.textInput;
 var languageType = req.body.languageType;


  // use the values in the Factory function

  greetRoutes.setlang(languageType);
  greetRoutes.setperson(textInput);
  
  // redirect
  res.redirect('/')
});

app.post('/display', function (req, res){

// get the values from the Factory Function and display them
  greetRoutes.GreetedPerson();

   // redirect
   res.redirect('/')
})

let PORT = process.env.PORT || 3310;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});