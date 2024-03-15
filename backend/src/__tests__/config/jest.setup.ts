import createApp from '#/createApp';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User, IUser } from '#/models/user.model';

let mongod: MongoMemoryServer;
const app = createApp();
export let testUser: IUser;
export let cookie: string;

const name = "test";
const email = "test@mail.com";
const password = "123456@";


export const cleanup = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};



beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();
  await mongoose.connect(mongoUri);

  testUser = await User.create({
    name,
    email,
    password
  })
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await cleanup();
});


process.on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
});


process.on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

describe('home page', () => {

  it('it should return 200 status code and works string', (done) => {

    request(app)
      .get('/')
      .expect(200)
      .then((data) => {
        expect(data.text).toEqual('works');
        done();
      })

  })

})


describe('user create api', () => {

  it('should login a user', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        email,
        password
      })
      .expect(200)
      .then((data) => {
        cookie = data.headers['set-cookie'];
        done()
      })

  })


})