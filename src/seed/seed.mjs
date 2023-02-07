/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';
import fs from 'fs';

const seed = async () => {
  console.log('CSV 파일 만들기 스타트');
  for (let i = 0; i < 500; i++) {
    const query = `\n'${faker.lorem.sentence()}', ${Math.ceil(
      Math.random() * 9,
    )}`;

    fs.appendFile('./src/seed/post.csv', query, 'utf8', (e) => {
      if (e) {
        console.log(e);
      }
    });
  }
};

seed();
