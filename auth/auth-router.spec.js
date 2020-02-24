const request = require('supertest');
const server = require('../api/server');

// const db = require('../database/dbConfig');

// beforeEach(async () => {
//     await db('users').truncate()
// })

// const userData = {
//     username: "TestingChester",
//     password: "ChesterCat"
// }

describe(' auth-router.js', () => {
    it("should set testing enviroment", () => {
        expect(process.env.DB_ENV).toBe('testing');
    }) //test without userData //works

    describe('GET /register', () => {
        it('should return 500', async () => {
            const res = await request(server)
                .post('/api/auth/register')
            expect(res.status).toBe(500);
        });

        it('should return JSON', async () => {
            const res = await request(server).post('/register');
            expect(res.type).toBe('text/html');
        });

        it("should return { (saved)} ||  { message: 'Failed to register a new user. '} ", async () => {
            const res = await request(server).post('/register');
            expect(res.body).toEqual( {} || { message: 'Failed to register a new user. '}); 
        });
    });

});