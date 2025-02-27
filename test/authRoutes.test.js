const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(201);
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toBe(400);
  });
});
