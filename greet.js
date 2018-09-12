module.exports = function (pool) {

var NameStorage ={};
  var GreetingMessage = "";
  var Countkeep = NameStorage || {};
  var person="";
var language ="";

  function setperson(value) {
    if (value !== "") {
    return person;
    }

  }

  function GreetLanguage(language,person) {


    if (Countkeep[person] === undefined) {

      Countkeep[person] = 0;
    }

    if (language === "English") {

      GreetingMessage = "Hey, " + person;

    }
    if (language === "IsiXhosa") {

      GreetingMessage = "Mhollo, " + person;

    }
    if (language === "Afrikaans") {

      GreetingMessage = "Halo, " + person;
      console.log(language);

    }

  }

  async function addNameToDB(name){

    await pool.query('insert into users(names, counts) values($1, $2)',[name,0])

  }

  function setlang(value) {language = value;}
  function LanguageReturn() { return language; }
  function PersonReturn() { return Countkeep; }
  function Message() { return GreetingMessage;}
  async function Counter() { 
    let counter = await pool.query('select count(*) from users')
    // console.log(counter.rows[0].count)
    return counter.rows[0].count
  }
  function resetBtn() {

     NameStorage ={};
     GreetingMessage = "";
     Countkeep = 0;
     person="";
     language ="";
  }

  return {

    GreetLanguage,
    Message,
    Counter,
    LanguageReturn,
    PersonReturn,
    resetBtn,
    setperson,
    addNameToDB,
    setlang

  }

}