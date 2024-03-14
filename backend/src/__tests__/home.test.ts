import createApp from "#/createApp"
import request from 'supertest'

const app = createApp();

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