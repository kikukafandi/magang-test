import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (E2E)', () => {
  let app: INestApplication;
  let token: string;
  const uniqueUser = `user_${Date.now()}`; 

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Test Register
  it('/users/register (POST) - Should register new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        username: uniqueUser,
        password: 'password123',
        name: 'Test User'
      })
      .expect(201); // Harapan: Created

    expect(response.body.data.username).toEqual(uniqueUser);
  });

  // 2. Test Login & Simpan Token
  it('/users/login (POST) - Should login and return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        username: uniqueUser,
        password: 'password123'
      })
      .expect(201);

    // Ambil token dari response dan simpan ke variabel
    token = response.body.data.access_token;
    console.log('Token didapat:', token); // Debugging

    expect(token).toBeDefined();
  });

  // 3. Test Endpoint Tanpa Token (Harus Gagal)
  it('/notes (POST) - Should reject access without token', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({ title: 'Test', content: 'Isi' })
      .expect(401); // Harapan: Unauthorized
  });

  // 4. Test Endpoint Dengan Token (Harus Sukses)
  it('/notes (POST) - Should create note with valid token', async () => {
    return request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${token}`) // <--- Pasang Token di sini
      .send({
        title: 'E2E Note',
        content: 'Ini note dibuat dari test otomatis'
      })
      .expect(201); // Harapan: Created
  });

  // 5. Test Get Notes Dengan Token
  it('/notes (GET) - Should return list of notes', async () => {
    const response = await request(app.getHttpServer())
      .get('/notes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Pastikan data yang barusan dibuat ada
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data[0].title).toBe('E2E Note');
  });
});