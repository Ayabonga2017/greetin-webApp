module.exports = function (pool) {

  async function GreetLanguage(language, person) {
if(person ==''){
  return 'enter name ';
}
    let result = await pool.query('select * from users where names = $1', [person])
    if (result.rows.length === 0) {
      await pool.query('insert into users(names, counts) values($1, $2)', [person, 1])
    } else {

      await pool.query("update users set counts=counts+1 where names=$1", [person]);
    }
if(!language){
  return 'select language';
}
    if (language === "English") { return "Hey, " + person; }
    if (language === "IsiXhosa") { return "Mhollo, " + person; }
    if (language === "Afrikaans") { return "Halo, " + person; }
  }

  async function Counter() {
    var counter = await pool.query('select count(*) from users ')
    return counter.rows[0].count
  }
  async function greetedNames() {
    var counter = await pool.query('select * from users  ')
    return counter.rows;
  }
  async function resetBtn() {
    var reset = await pool.query('delete from users ')
    return reset;
  }

  return {
    GreetLanguage,
    Counter,
    resetBtn,
    greetedNames
  }
}