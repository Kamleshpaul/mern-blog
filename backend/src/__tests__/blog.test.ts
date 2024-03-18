import createApp from "#/createApp"
import request from 'supertest'
import { cookie, testUser } from "./config/jest.setup";
import { faker } from "@faker-js/faker";
import { Category, ICategory } from "#/models/category.model";
import slugify from "slugify";
import { Blog } from "#/models/blog.model";

const app = createApp();
let ID: string;
let category: ICategory;;


(async () => {
  category = (await Category.create({ name: "test category" }));
})()

describe('blog create api', () => {

  it('should able to  create  blog', (done) => {
    const title = faker.lorem.sentence();
    const image = faker.image.url();
    const slug = slugify(title);
    const body = faker.lorem.paragraphs(10);
    const categoryId = category?._id;
    const author = testUser?._id;

    request(app)
      .post('/api/blogs')
      .set('Cookie', cookie)
      .send({
        title,
        image,
        slug,
        body,
        category: categoryId,
        author
      })
      .expect(201)
      .then((data) => {
        ID = data.body.data._id
        expect(data.body.message).toBe('Blog Created.')
        expect(data.body).toHaveProperty('status')
        expect(data.body).toHaveProperty('data')
        expect(data.body).toHaveProperty('message')
        expect(data.body).toHaveProperty('data.title', title)

        done()
      })

  })


  it('should throw 422 validation error', (done) => {
    request(app)
      .post('/api/blogs')
      .set('Cookie', cookie)
      .expect(422)
      .then(({ body }) => {
        expect(body.length).toBe(6)
        expect(body.map((x: any) => x.path[0]).sort()).toEqual([
          "title",
          "image",
          "slug",
          "body",
          "category",
          "author"
        ].sort())
        done()
      })
  })


  it('should able to comment in single blog', (done) => {
    const comment = "I like this blog";
    request(app)
      .post(`/api/blogs/${ID}/comment`)
      .set('Cookie', cookie)
      .send({
        comment
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.status).toBe(true);
        expect(body.message).toBe('commented.');
        done()
      })
  })


  it('should return single blog', (done) => {

    request(app)
      .get(`/api/blogs/${ID}`)
      .set('Cookie', cookie)
      .expect(200)
      .then((data) => {
        expect(Object.keys(data.body.data).length).toBe(14)
        done()
      })
  })

  it('should delete  single blog', (done) => {

    request(app)
      .delete(`/api/blogs/${ID}`)
      .set('Cookie', cookie)
      .expect(200)
      .then(async (data) => {
        const count = await Blog.find().countDocuments();
        expect(data.body.message).toBe('Blog Deleted.');
        expect(count).toBe(0)
        done()
      })
  })

})