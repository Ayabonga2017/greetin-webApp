let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');


app.use(express.static('public'));

app.get("/", function(req, res){
  res.send("greetings");
});


let PORT = process.env.PORT || 3310;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
