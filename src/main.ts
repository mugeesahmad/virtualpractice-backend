import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import * as passport from 'passport';
import * as session from 'express-session';
import * as ConnectSessionSequelize from 'connect-session-sequelize';

// Creating a sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
});

// Creating a session store for express-session
const SequelizeStore = ConnectSessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
  modelKey: 'sessions',
  checkExpirationInterval: 1000 * 60 * 60,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.use(
    session({
      secret: process.env.APP_SECRET || 'secret',
      saveUninitialized: false,
      resave: false,
      rolling: true,
      store: sessionStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(Number(process.env.PORT));
}
bootstrap();
