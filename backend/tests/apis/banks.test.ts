import { describe, expect, it } from '@jest/globals';
import app from '../../src/app';
const supertest = require("supertest");

const request = supertest(app);


describe('bank apis', () => {
    it('Gets bank list', async () => {
        const response = await request.get("/api/v1/finance/banks/get");
        expect(response.status).toBe(200);

        expect(response.body.data.length).toBeGreaterThan(0);
        
        const data = response.body.data;
        expect(Object.keys(data[0])).toContain('id');
        expect(Object.keys(data[0])).toContain('name');        
    });
});