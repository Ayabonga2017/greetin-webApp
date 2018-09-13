module.exports = function (pool) {

  var GreetingMessage = "";

  async function GreetLanguage(language, person) {

    let result = await pool.query('select * from users where names = $1', [person])
    if (result.rowCount === 0) {
      await pool.query('insert into users(names, counts) values($1, $2)', [person, 1])
    } else {
      await pool.query('update users set counts=counts+1 where names =$1', [person])
    }
    if (language === "English") { GreetingMessage = "Hey, " + person; }
    if (language === "IsiXhosa") { GreetingMessage = "Mhollo, " + person; }
    if (language === "Afrikaans") { GreetingMessage = "Halo, " + person; console.log(language); }
  }
  function setlang(value) { language = value; }
  function Message() { return GreetingMessage; }
  async function Counter() {
    var counter = await pool.query('select count(*) from users')
    return counter.rows[0].count
  }
  async function greetedNames() {
    var counter = await pool.query('select * from users  ')
    return counter.rows;  
  }
  function resetBtn() {
    counter = 0;
  }
  return {
    GreetLanguage,
    Message,
    Counter,
    resetBtn,
    greetedNames,
    setlang
  }
}