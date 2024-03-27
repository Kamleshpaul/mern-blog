import createApp from "#/createApp"
import request from 'supertest'
import { cookie } from "./config/jest.setup";
import { faker } from "@faker-js/faker";
import { User } from "#/models/user.model";

const app = createApp();
let userId: string;

describe('user create api', () => {

  it('should able to  create  user', (done) => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();


    request(app)
      .post('/api/users')
      .set('Cookie', cookie)
      .send({
        name: name,
        email: email,
        password: password
      })
      .expect(201)
      .then((data) => {

        userId = data.body.data._id
        expect(data.body.message).toBe('User Created.')
        expect(data.body).toHaveProperty('status')
        expect(data.body).toHaveProperty('data')
        expect(data.body).toHaveProperty('message')
        expect(data.body).toHaveProperty('data.name', name)
        expect(data.body).toHaveProperty('data.email', email.toLocaleLowerCase())
        expect(data.body).toHaveProperty('data.password')
        expect(data.body.data.password).not.toBe(password)

        done()
      })

  })


  it('should throw 422 validation error', (done) => {
    request(app)
      .post('/api/users')
      .set('Cookie', cookie)
      .expect(422)
      .then((data) => {

        expect(data.body.errors.length).toBe(3)
        expect(data.body.errors.map((x: any) => x.path[0]).sort()).toEqual([
          "name",
          "email",
          "password"
        ].sort())
        done()
      })
  })

  it('should throw 422 for name validation', (done) => {

    const name = '';
    const email = faker.internet.email();
    const password = faker.internet.password();

    request(app)
      .post('/api/users')
      .set('Cookie', cookie)
      .send({
        name, email, password
      })
      .expect(422)
      .then((data) => {
        expect(data.body.errors.length).toBe(1)
        expect(data.body.errors[0].message).toBe('String must contain at least 1 character(s)')
        done()
      })
  })

  it('should throw 422 for email already exist validation', (done) => {

    const name = faker.person.firstName();
    const email = "test@mail.com";
    const password = faker.internet.password();

    request(app)
      .post('/api/users')
      .set('Cookie', cookie)
      .send({
        name, email, password
      })
      .expect(422)
      .then((data) => {
        expect(data.body.errors.length).toBe(1)
        expect(data.body.errors[0].message).toBe('already exist!')
        done()
      })
  })


  it('should return users collections', (done) => {
    request(app)
      .get('/api/users')
      .set('Cookie', cookie)
      .expect(200)
      .then((data) => {
        expect(data.body.data.length).toBe(2)
        done()
      })
  })

  it('should return single user', (done) => {

    request(app)
      .get(`/api/users/${userId}`)
      .set('Cookie', cookie)
      .expect(200)
      .then((data) => {
        expect(Object.keys(data.body.data).length).toBe(6)
        done()
      })
  })

  it('should delete  single user', (done) => {

    request(app)
      .delete(`/api/users/${userId}`)
      .set('Cookie', cookie)
      .expect(200)
      .then(async (data) => {
        const count = await User.find().countDocuments();
        expect(data.body.message).toBe('User Deleted.');
        expect(count).toBe(1)
        done()
      })
  })



  it('should register as normal user', (done) => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    request(app)
      .post('/api/auth/register')
      .send({
        name: name,
        email: email,
        password: password
      })
      .expect(201)
      .then((data) => {

        userId = data.body.data._id
        expect(data.body.message).toBe('Register Successfully.')
        expect(data.body).toHaveProperty('status')
        expect(data.body).toHaveProperty('data')
        expect(data.body).toHaveProperty('message')
        expect(data.body).toHaveProperty('data.name', name)
        expect(data.body).toHaveProperty('data.email', email.toLocaleLowerCase())
        expect(data.body).toHaveProperty('data.role', "user")
        expect(data.body).toHaveProperty('data.password')
        expect(data.body.data.password).not.toBe(password)

        done()
      })
  })

  it('should return 422 validation error', (done) => {
    const name = faker.person.firstName();
    const email = 'test@mail.com';
    const password = faker.internet.password();

    request(app)
      .post('/api/auth/register')
      .send({
        name,
        email,
        password
      })
      .expect(400)
      .then((data) => {
        expect(data.body.message).toBe('User Already Exist')
        expect(data.body).toHaveProperty('status')
        expect(data.body).toHaveProperty('status', false)
        done()
      })
  })

})