const request = require('supertest');

const server = require('../api/server.js');

describe(' jokes-router.js', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /api/jokes', () => {
        it('should return status 401', async () => {
            const res = await request(server).get("/api/jokes/");
            expect(res.status).toBe(401);
        });

        it('should return a joke', async () => {
            const res = await request(server).get(" /api/jokes/");
            expect(res.body).toContain({
            });
        });
    });
})