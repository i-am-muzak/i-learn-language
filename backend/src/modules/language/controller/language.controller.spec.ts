import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

const create_url = '/language/create';

import { languages } from './language.stub';

// Create Languages - Success
for (let i = 0; i < languages.length; i++) {
  const data = languages[i];
  describe('LanguageController', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    it(`should create a new language model for - ${data.title}`, () => {
      return request(app.getHttpServer())
        .post(create_url)
        .send({
          title: data.title,
          is_active: data.is_active,
        })
        .expect(201);
    });

    afterAll((done) => {
      app.close();
      done();
    });
  });
}
