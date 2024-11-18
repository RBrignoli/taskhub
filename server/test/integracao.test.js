const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // substitua pelo caminho do arquivo principal do Express


// const Project = require('../controllers/projectsControl').Project;

// beforeAll(async () => {
//   await mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });


  // Teste para criação de projeto
  it('deve criar um novo projeto', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ name: 'New Project', owner: 'userId123' });

    expect(res.statusCode).toBe(201);
    //expect(res.body.name).toBe('New Project');
    projectId = res.body._id;
  });

//   // Teste para listagem de projetos
//   it('deve listar projetos do usuário', async () => {
//     const res = await request(app)
//       .get('/api/projects')
//       .set('Authorization', `Bearer token_valido`)
//       .set('user', { _id: 'userId123', admin: false }); // simulando usuário

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   // Teste para obter um projeto específico
//   it('deve obter um projeto pelo ID', async () => {
//     const res = await request(app)
//       .get(`/api/projects/${projectId}`)
//       .set('Authorization', `Bearer token_valido`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body._id).toBe(projectId);
//   });

//   // Teste para atualizar um projeto
//   it('deve atualizar o projeto', async () => {
//     const res = await request(app)
//       .put(`/api/projects/${projectId}`)
//       .send({ name: 'Updated Project Name' })
//       .set('Authorization', `Bearer token_valido`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe('Updated Project Name');
//   });

//   // Teste para deletar um projeto
//   it('deve deletar o projeto', async () => {
//     const res = await request(app)
//       .delete(`/api/projects/${projectId}`)
//       .set('Authorization', `Bearer token_valido`)
//       .set('user', { _id: 'userId123', admin: true }); // simulando usuário admin

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe('Project deleted successfully');
//   });
