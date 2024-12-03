const { removeDuplicates } = require('../controllers/projectsControl')
const request = require('supertest')
const app = require('../index')

describe('testar as funcoes de projetos', () => {
    process.env.jwt_secret_key = 'uma_secret_key_qualquer'
    beforeAll(async () => {
        const token = jwt.sign(
            {
              _id: 1,
              email: 'teste@teste.com',
              name: 'teste',
              admin:  false
            },
            process.env.jwt_secret_key,
            { expiresIn: 1000 * 60 * 60 * 24 * 3 }
          );
        cookie = response.headers['set-cookie'][0];
      });

    it("should return all projects", async () => {
        await request(app).get('/projects/').then((res) =>{
            expect(res.statusCode).toBe(200)
        })
        })
})