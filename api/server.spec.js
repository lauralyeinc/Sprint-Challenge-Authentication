const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('should return 200 Ok', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200); 
        })
    it('should return JSON', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json');
    })

    it('should return {api: "Sprint Challenge Authentication! 👸 "}', async ()      => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({api: "Sprint Challenge Authentication! 👸 "});
        })

    })

    
});