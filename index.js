let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const GreetRoutes = require('./greet');
const greetRoutes = GreetRoutes();


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.send("greetings app");
});


let PORT = process.env.PORT || 3310;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});