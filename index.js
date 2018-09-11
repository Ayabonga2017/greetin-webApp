let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const Greet = require('./greet');
const factory = Greet();
app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))


const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:9191/users';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

app.get("/", function (req, res) {

  var language = factory.LanguageReturn()
  res.render("home", {language });
});

app.post('/greetings', function (req, res) {

  // get the values from the form (req.body)
  var language = req.body.language;
  var firstName = req.body.firstName;
  
  console.log(firstName);
  console.log(language);
  // use the values in the Factory function
  factory.setlang(language);
  factory.setperson(firstName);
  var name_language = factory.GreetLanguage(language, firstName)

  let results = {

    language: factory.LanguageReturn(),
    firstName: factory.PersonReturn()
  }
  var displaymessage = factory.Message();
  var counterdisplay= factory.Counter();

  if (firstName === '' && language === undefined) {
    return displaymessage = 'Please Enter a Name and Select a Language !';
  }
  else if (!language) { return displaymessage = "Please select language"; }
  else if (firstName === "") { return displaymessage = "Please enter name"; }


  console.log(displaymessage);
  console.log(counterdisplay);
  // console.log(results)
  // render to home
  res.render('home', {name_language , displaymessage,counterdisplay, results})
});

let PORT = process.env.PORT || 9191;
app.listen(PORT, function () { console.log('App starting on port', PORT); });


