let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const Greet = require('./greet');

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
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:mlandeli2017@localhost:5555/greetings';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });
  const factory = Greet(pool);
app.get("/", async function (req, res, next) {

  try  {
    res.render("home");
  } catch (error) {
    next(error);
  }
});

app.post('/greetings', async function (req, res) {

  // get the values from the form (req.body)
  var language = req.body.language;
  var firstName = req.body.firstName;
  
  await factory.addNameToDB(firstName)

  // use the values in the Factory function
  factory.setlang(language);
  factory.setperson(firstName);
  var name_language = factory.GreetLanguage(language, firstName)

  let results = {

    language: factory.LanguageReturn(),
    firstName: factory.PersonReturn()
  }
  var displaymessage = factory.Message();
  var counterdisplay= await factory.Counter();
console.log(counterdisplay)
  //  let finalCount = counterdisplay.count

  if (firstName === '' && language === undefined) {
    return displaymessage = 'Please Enter a Name and Select a Language !';
  }
  else if (!language) { return displaymessage = "Please select language"; }
  else if (firstName === "") { return displaymessage = "Please enter name"; }

  res.render('home', {name_language , displaymessage,counterdisplay, results})
});

app.get('/resets', function(req ,res ){

  var reset = factory.resetBtn();
  console.log(reset);
  res.render("home", {reset})
})
app.get('/greeted', async function(req ,res ){
  var fromUsers =  await pool.query("select names from users");
  let users = fromUsers.rows
  res.render("greeted", {
    users
   });
})
let PORT = process.env.PORT || 1991;
app.listen(PORT, function () { console.log('App starting on port', PORT); });


