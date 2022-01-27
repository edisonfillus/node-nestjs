# NestJS boilerplate

## Create from scratch
```bash
$ npm install -g @nestjs/cli
$ nest new project-name --skip-git
```

## Enable Validation
Install class-validator and class-transformer
```bash
$ npm install class-validator class-transformer
```
Include on main.ts
```javascript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
}));
```

## Enable .env Configuration
Install config
```bash
$ npm install @nestjs/config joy
```
Create a .env file

Include the module in app.module.ts, and add the validation schema
```typescript
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number()
      })
    })
  ]
})
```



## Enable Authorization
Install Passport
```bash
$ npm install @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```
Create a auth and users module Module
```bash
$ nest generate module auth
$ nest generate service auth
$ nest generate module users
$ nest generate service users
```
Implement the CRUD users, auth and passport strategies following tutorial: https://docs.nestjs.com/techniques/authentication

Install JWT
```bash
$ npm install @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
```


## Enable TypeORM
Install TypeORM
```bash
$ npm install @nestjs/typeorm typeorm
```
Install sql.js driver for test
```bash
$ npm install sql.js
```
Install production database driver
```bash
$ npm install mysql
$ npm install pg
$ npm install mssql
$ npm install oracledb
$ npm install mongodb
```

Create repositories
```javascript
@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}
```
Configure on AppModule
```javacript
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

Configure on Feature Module
```javascript
@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  controller: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
```
Inject on services
```
@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}
}
```


## Enable Swagger for RestAPI Docs
Install packages
```bash
$ npm install --save @nestjs/swagger swagger-ui-express
```
Include configuration on main.ts
```javascript
const options = new DocumentBuilder()
      .setTitle('NestJS example')
      .setDescription('Example API')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
```


## Add a new module
```bash
$ nest generate module module-name
$ nest generate controller controler-name
$ nest generate service service-name
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
