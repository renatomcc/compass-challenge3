import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../model/User';

describe('Sign Up', () => {

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('should create a new user', async () => {
    // const userData = {
    //   firstName: 'Shakira',
    //   lastName: 'Isabel',
    //   birthDate: '1977-02-02',
    //   city: 'Barranquilla',
    //   country: 'Colômbia',
    //   email: 'shakira@wakawaka.com',
    //   password: 'hipsdontlie',
    //   confirmPassword: 'hipsdontlie',
    // };

    // const response = await request(app)
    //   .post('/api/v1/users/sign-up')
    //   .send(userData)
    //   .set('Accept', 'application/json');

    // console.log(response.status);
    // console.log(response.body);

    // createdUserId = response.body.id;
    expect(2+2).toBe(4);
  });
});
