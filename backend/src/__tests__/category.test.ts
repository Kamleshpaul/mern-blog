import createApp from "#/createApp"
import request from 'supertest'
import { cookie } from "./config/jest.setup";
import { Category } from "#/models/category.model";

const app = createApp();
let ID: string;

describe('category create api', () => {

  it('should create a new category', (done) => {
    const name = "fake category";

    request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({
        name
      })
      .expect(201)
      .then((data) => {
        ID = data.body.data._id;
        expect(data.body.message).toBe('Category Created.')
        expect(data.body).toHaveProperty('status')
        expect(data.body).toHaveProperty('data')
        expect(data.body).toHaveProperty('message')
        expect(data.body).toHaveProperty('data.name', name);
        done()
      })

  })

  it('should throw 422 validation error', (done) => {
    request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .expect(422)
      .then((data) => {

        expect(data.body.errors.length).toBe(1)
        expect(data.body.errors.map((x: any) => x.path[0]).sort()).toEqual([
          "name",
        ].sort())
        done()
      })
  })


  it('should throw 422 for name validation', (done) => {

    const name = '';
    request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({
        name,
      })
      .expect(422)
      .then((data) => {
        expect(data.body.errors.length).toBe(1)
        expect(data.body.errors[0].message).toBe('String must contain at least 1 character(s)')
        done()
      })
  })


  it('should return Category collections', (done) => {
    request(app)
      .get('/api/categories')
      .set('Cookie', cookie)
      .expect(200)
      .then((data) => {
        expect(data.body.data.length).toBe(1)
        done()
      })
  })

  it('should return single Category', (done) => {

    request(app)
      .get(`/api/categories/${ID}`)
      .set('Cookie', cookie)
      .expect(200)
      .then((data) => {
        expect(Object.keys(data.body.data).length).toBe(5)
        done()
      })
  })


  it('should delete  single Category', (done) => {

    request(app)
      .delete(`/api/categories/${ID}`)
      .set('Cookie', cookie)
      .expect(200)
      .then(async (data) => {
        const count = await Category.find().countDocuments();
        expect(data.body.message).toBe('Category Deleted.');
        expect(count).toBe(0)
        done()
      })
  })


})