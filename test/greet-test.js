const greet = require('../greetFactory');
const assert = require('assert');
const pg = require("pg");
const greetFactory = require('../greetFactory');
const Pool = pg.Pool;

// we are using a special test database for the tests
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users',
    ssl: {
        useSSL,
      rejectUnauthorized: false
    }
  });

describe('Greetings', function () {
    const greeting = greet();
    it('should greet "Hello, Jodie"', function () {
        (greeting.greetMe('Jodie', 'English'),

            assert.equal(greeting.returnMessage('Hello, Jodie'), 'Hello, Jodie'));
    });
    it('should greet "Hallå, Amy"', function () {
        (greeting.greetMe('Amy', 'Swedish'),

            assert.equal(greeting.returnMessage('Hallå, AMY'), 'Hallå, Amy'));
    });
    it('should greet "Hallo, Paul"', function () {
        (greeting.greetMe('Paul', 'Dutch'),

            assert.equal(greeting.returnMessage('Hallo, Paul'), 'Hallo, Paul'));
    });
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should pass the db test', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane', 'English'
        );
        await greet.addNames(
            'Allen', 'English'
        );
        await greet.addNames(
            'James', 'English'
        );


        let count = await greet.namesList();
        assert.deepEqual([{ username: 'Jane' }, { username: 'Allen' }, { username: 'James' }], count);
    });

    it('should return the count', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane', 'English'
        );
        await greet.addNames(
            'Allen', 'English'
        );
        await greet.addNames(
            'James', 'English'
        );



        let count = await greet.select();
        assert.deepEqual(3, count);
    });
    it('should not count duplicate names', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane', 'English'
        );
        await greet.addNames(
            'Jane', 'English'
        );
        await greet.addNames(
            'Jane', 'English'
        );


        let count = await greet.select();
        assert.deepEqual(1, count);
    });
    it('should not include non-alphabetic characters', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane', 'English'
        );
        await greet.addNames(
            '123', 'English'
        );
        await greet.addNames(
            '!@#$%', 'English'
        );

        let count = await greet.select();
        assert.equal(1, count);
    });
    
    after(function () {
        pool.end();
    })
});