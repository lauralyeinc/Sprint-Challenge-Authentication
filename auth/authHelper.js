const db = require('../database/dbConfig.js');  

// add a new user to auth-router.js
async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({id})
        .first();
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);

}

module.exports = {
    add,
    findBy,
    findById
}