let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const Greet = require('./greet');
const flash = require('express-flash');
const session = require('express-session');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "this line for an error message",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

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
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:mlandeli2017@localhost:5555/greetings';
const pool = new Pool({
  connectionString,
  ssl: useSSL
});
const factory = Greet(pool);
app.get("/", async function (req, res, next) {
  let counts = await factory.Counter();

  try {
    res.render("home", { counts });
  } catch (error) {
    console.log(error)
    next(error);
  }
});
app.post("/home" ,async function (req , res){

  res.render("home")
} )
app.get('/home', async function (req, res, next) {

  // var displaymessage = await factory.GreetLanguage();
  // var counterdisplay = await factory.Counter();
  res.render('home', { })
})
app.post('/greetings', async function (req, res, next) {
  try {
    // get the values from the form (req.body)
    var language = req.body.language;
    var firstName = req.body.firstName;
    console.log(language)

    if (firstName == '' || firstName == undefined) {
      req.flash('info', ' enter a name first');

    }
    if (!language) {
      req.flash('info', ' select a language');
    }

    var results = {
      displaymessage: factory.GreetLanguage(),
      counterdisplay: factory.Counter()
    }
    console.log(firstName);
  var  displaymessage= await factory.GreetLanguage(language,firstName);

    res.render('home', { results , displaymessage})

  } catch (error) {
    console.log(error)
    next(error)
  }
});
app.post('/reset', async function (req, res) {

  let reset = factory.resetBtn();
  res.render("greeted", { reset })
})
app.get('/greeted', async function (req, res) {

  let users = await factory.greetedNames();
  // console.log(users);
  res.render("greeted", { users })
})

let PORT = process.env.PORT || 1985;
app.listen(PORT, function () { console.log('App starting on port', PORT); });
