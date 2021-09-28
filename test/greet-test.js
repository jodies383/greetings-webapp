
const greet = require('../greetFactory');
const assert = require('assert');
// const CategoryService = require('../services/category-service');
const pg = require("pg");
const greetFactory = require('../greetFactory');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users';

const pool = new Pool({
    connectionString
});

describe('Greetings', function () {
    const greeting = greet();
    it('should greet "HELLO, JODIE"', function () {
        (greeting.greetMe('Jodie', 'English'),

            assert.equal(greeting.returnMessage('HELLO, JODIE'), 'HELLO, JODIE'));
    });
    it('should greet "HALLÅ, AMY"', function () {
        (greeting.greetMe('Amy', 'Swedish'),

            assert.equal(greeting.returnMessage('HALLÅ, AMY'), 'HALLÅ, AMY'));
    });
    it('should greet "HALLO, PAUL"', function () {
        (greeting.greetMe('Paul', 'Dutch'),

            assert.equal(greeting.returnMessage('HALLO, PAUL'), 'HALLO, PAUL'));
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
            'Jane'
        );
        await greet.addNames(
            'Allen'
        );
        await greet.addNames(
            'James'
        );


        let count = await greet.namesList();
        assert.deepEqual([{ username: 'Jane' }, { username: 'Allen' }, { username: 'James' }], count);
    });

    it('should return the count', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane'
        );
        await greet.addNames(
            'Allen'
        );
        await greet.addNames(
            'James'
        );



        let count = await greet.select();
        assert.deepEqual(3, count);
    });
    it('should not count duplicate names', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane'
        );
        await greet.addNames(
            'Jane'
        );
        await greet.addNames(
            'Jane'
        );


        let count = await greet.select();
        assert.deepEqual(1, count);
    });
    it('should not include non-alphabetic characters', async function () {

        // the Factory Function is called greetFactory
        let greet = greetFactory(pool);
        await greet.addNames(
            'Jane'
        );
        await greet.addNames(
            '123'
        );
        await greet.addNames(
            '!@#$%'
        );

        let count = await greet.select();
        assert.equal(1, count);
    });

    after(function () {
        pool.end();
    })
});