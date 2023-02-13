import { faker } from '@faker-js/faker';
import fs from 'fs';

//* Datagrip에서 데이터를 넣을 때 사용할 CSV 파일 생성
//? CSV로 넣는 이유는 nestjs에서 엄청나게 많은 데이터를 넣을 때 메모리 부족 현상이 발생하기 때문

const createSeed = async () => {
  console.log('*********** CSV 파일 만들기 스타트 ***********');

  createUsers();
  createUserInfos();
  createPosts();

  console.log('*********** CSV 파일 만들기 끝 ***********');
};

const createUsers = () => {
  for (let i = 0; i < 5000; i++) {
    // NAME, EMAIL, PROFILE, PROVIDER, ROLE
    const query = `\n'${faker.name.lastName()}', '${faker.internet.email()}', '${faker.lorem.sentence()}', '${
      ['GOOGLE', 'KAKAO', 'NAVER', 'ETC'][Math.floor(Math.random() * 4)]
    }', '${['USER', 'ADMIN'][Math.floor(Math.random() * 2)]}'`;

    fs.appendFile('./src/seed/user.csv', query, 'utf8', (e) => {
      if (e) {
        console.log(e);
      }
    });
  }
};

const createPosts = () => {
  for (let i = 0; i < 5000; i++) {
    // CONTENT, WRITER_ID
    const query = `\n'${faker.lorem.sentence()}', ${Math.ceil(
      Math.random() * 5000,
    )}`;

    fs.appendFile('./src/seed/post.csv', query, 'utf8', (e) => {
      if (e) {
        console.log(e);
      }
    });
  }
};

const createUserInfos = () => {
  for (let i = 0; i < 5000; i++) {
    // USER_ID, HEIGHT, WEIGHT, ADDRESS
    const query = `\n${Math.ceil(Math.random() * 5000)}, ${
      Math.floor(Math.random() * 100) + 50
    }, ${Math.floor(Math.random() * 80) + 100}, '${faker.address.city()}'`;

    fs.appendFile('./src/seed/user_info.csv', query, 'utf8', (e) => {
      if (e) {
        console.log(e);
      }
    });
  }
};

createSeed();
