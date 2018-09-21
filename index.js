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
// which db connection to usecoder123

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:coder123@localhost:5432/greets';
const pool = new Pool({
  connectionString,
  ssl: useSSL
});
const factory = Greet(pool);
app.get("/", async function (req, res, next) {

  try {
 
    let counts = await factory.Counter();
    res.render("home", { counts});
  } catch (error) {

    next(error);
  }
  
});
app.post('/home', async function (req, res, next) {

  try {
    let namegreeted = await factory.greetedwithL()
  var counterdisplay = await factory.Counter();

  res.render('home', { counterdisplay ,namegreeted})
  } catch (error) {
    next(error)
  }
})
app.post('/greetings', async function (req, res, next) {
  try {
    // get the values from the form (req.body)
    var language = req.body.language;
    var firstName = req.body.firstName;
    console.log(language)

    if (firstName == '') {
      req.flash('info', 'Please enter a Name');
    }
   if (!language) {
      req.flash('info', 'Please select a Language');
    } else {
      var displaymessage = await factory.GreetLanguage(language, firstName);
      var  counterdisplay= await factory.Counter();
  }
    res.render('home', {displaymessage,counterdisplay})
  } catch (error) {
 
    next(error)
  }
});
app.post('/reset', async function (req, res, next) {
  try {
    let reset = await factory.resetBtn();
    
  res.render("greeted", { reset })
  } catch (error) {
    next(error)
  }

})
app.get('/greeted', async function (req, res, next) {
try {
  let greetings = await factory.greetedNames();
 
  res.render("greeted", { greetings })
} catch (error) {
  
  next(error)
}
})

let PORT = process.env.PORT || 50501;
app.listen(PORT, function () { console.log('App starting on port', PORT); });
