const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const ProjectMessage = require('../models/projectMessage');

describe('Project endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterEach(async () => {
    await ProjectMessage.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return an empty array when there are no projects', async () => {
    const res = await request(app).get('/projects');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new project', async () => {
    const newProject = { title: 'Test Project', message: 'This is a test project' };
    const res = await request(app).post('/projects').send(newProject);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Project');
    expect(res.body.message).toEqual('This is a test project');
  });

  it('should update an existing project', async () => {
    const newProject = { title: 'Test Project', message: 'This is a test project' };
    const resCreate = await request(app).post('/projects').send(newProject);
    const updatedProject = { title: 'Updated Project', message: 'This project has been updated' };
    const resUpdate = await request(app).put(`/projects/${resCreate.body._id}`).send(updatedProject);
    expect(resUpdate.statusCode).toEqual(201);
    expect(resUpdate.body.title).toEqual('Updated Project');
    expect(resUpdate.body.message).toEqual('This project has been updated');
  });

  it('should return 404 when updating a non-existing project', async () => {
    const nonExistingId = '610f8b98fb02d70df81b6309';
    const updatedProject = { title: 'Updated Project', message: 'This project has been updated' };
    const res = await request(app).put(`/projects/${nonExistingId}`).send(updatedProject);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('No projects with the id');
  });
});