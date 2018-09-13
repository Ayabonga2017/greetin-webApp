let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const Greet = require('./greet');
const flash = require('express-flash');
const session = require('express-session');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
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
  let counts = await factory.Counter()
  try {
    res.render("home", { counts });
  } catch (error) {
    next(error);
  }
});
app.post('/greetings', async function (req, res, next) {
  try {
    // get the values from the form (req.body)
    var language = req.body.language;
    var firstName = req.body.firstName;
    var name_language = await factory.GreetLanguage(language, firstName)
    var displaymessage = factory.Message();
    var counterdisplay = await factory.Counter();
    console.log(counterdisplay)
    res.render('home', { name_language, displaymessage, counterdisplay })
  } catch (error) {
    console.log(error)
    next(error)
  }
});
app.get('/resets', async function (req, res) {  
  var reset = factory.resetBtn();
  console.log(reset);
  res.render("home", { reset })
})
app.get('/greeted', async function (req, res) {
  
  let  users = await factory.greetedNames();
  console.log(users);

  res.render("greeted", {
    users
  });
})
let PORT = process.env.PORT || 1991;
app.listen(PORT, function () { console.log('App starting on port', PORT); });