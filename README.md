# NestJS boilerplate

## Create from scratch
```bash
$ npm install -g @nestjs/cli
$ nest new project-name
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
$ npm install @nestjs/config
```
Create a .env file

Include the module in app.module.ts
```javascript
ConfigModule.forRoot({isGlobal: true})
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
$ nest g module module-name
$ nest g controller controler-name
$ nest g service service-name
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
