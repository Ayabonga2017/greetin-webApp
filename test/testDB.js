const assert = require('assert');
const factoryGreet = require('/greet');
const factory = factoryGreet();
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:coder123@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greetings;");
  
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let categoryService = factory(pool);
        await factory.GreetLanguage.add({
            description : "Diary"
        });

        let categories = await categoryService.all();
        assert.equal(1, categories.length);

    });

    after(function(){
        pool.end();
    })
});