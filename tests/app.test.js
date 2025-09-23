const request = require('supertest');
const app = require('../src/index');

describe('Swiggy Clone API', () => {
  it('GET / should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Swiggy Clone - Hello!');
  });

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /restaurants should return array', async () => {
    const res = await request(app).get('/restaurants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
