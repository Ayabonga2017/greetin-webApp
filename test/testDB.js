const assert = require('assert');
const Greet = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/greetings_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should pass if there\'s no one greeted', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        // let count = await greetMe.greetCounter();
        assert.equal(0, await greetMe.greetCounter());

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query('delete from users');
    });

    it('should greet 2 people and the counter is equal to 2', async function(){

        // the Factory Function is called Greet
        let greetEng = Greet(pool);
        await greetEng.GreetLanguage("Ayabonga", "English");
        await GreetLanguageEng.GreetLanguage("Asa", "Afrikaans");

        assert.equal(2, await greetEng.Counter());

    });

    after(function(){
        pool.end();
    })
});