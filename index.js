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

  
app.use(bodyParser.json());

app.get("/", function (req, res) {
   
  let nameDisplay = greetRoutes.GreetLanguage(greetRoutes.GreetedPerson(),greetRoutes.languagereturn());

  let counter = greetRoutes.CountPeople();
  res.render("home", {counter, nameDisplay});
});


app.post('/greetings', function(req, res) {

 // get the values from the form (req.body)
 var textInput = req.body.textInput;
 var languageType = req.body.languageType;
  console.log(textInput);
  // use the values in the Factory function

  greetRoutes.setlang(languageType);
  greetRoutes.setperson(textInput);
  
  // redirect
  res.redirect('/')
});

app.post('/display', function (req, res){

// get the values from the Factory Function and display them
  greetRoutes.GreetedPerson();
  console.log(req.body.textInput);
   // redirect
   res.redirect('/')
});

let PORT = process.env.PORT || 31314;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});