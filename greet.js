module.exports = function (pool) {

  var GreetingMessage = "";

  async function GreetLanguage(language, person) {
    console.log('hallow')
    if (person  !=='' || language === undefined){
   
      let result = await pool.query('select * from users where names = $1', [person])
      if (result.rows.length === 0){
        await pool.query('insert into users(names, counts) values($1, $2)', [person , 1])
      } else {
        let increment = result.rows[0].countes + 1;
        await pool.query('update users set counts=$2 where names =$1', [person, increment])
      }
      if (language === "English") { GreetingMessage = "Hey, " + person; }
      if (language === "IsiXhosa") { GreetingMessage = "Mhollo, " + person; }
      if (language === "Afrikaans") { GreetingMessage = "Halo, " + person; console.log(language); }
      // else if() { GreetingMessage = 'please enter name ' }
    }
    
  }
  function setlang(value) { language = value; }
  function Message() { return GreetingMessage; }
  
  async function Counter() { var counter = await pool.query('select count(*) from users ')
    return counter.rows[0].count }
  async function greetedNames() { var counter = await pool.query('select * from users  ')
    return counter.rows; }
  async function resetBtn() { var reset = await pool.query('delete from users ')
    return reset; }

  return {
    GreetLanguage,
    Message,
    Counter,
    resetBtn,
    greetedNames,
    setlang
  }
}