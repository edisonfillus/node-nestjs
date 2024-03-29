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
$ npm install @nestjs/config joi
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
```typescript
@EntityRepository()
export class AuthorRepository {
  constructor(private readonly manager: EntityManager) {}
}
```
Configure in-memory database on AppModule
```typescript
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqljs',
        synchronize: true,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        logging: "all"
      })
    }),
  ],
})
```

Configure a mysql database in AppModule
```typescript
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
  imports: [TypeOrmModule.forFeature([Author])],
  controller: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
```
Inject on services
```typescript
@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}
}
```

###Testing with in-memory database
sqljs
```typescript
let repository: RecipeRepository;
let entityManager: EntityManager;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqljs',
        synchronize: true,
        entities: [Recipe, Ingredient],
        keepConnectionAlive: false,
        logging: "all"
      }),
    ],
    providers: [RecipeRepository]
  }).compile();
  repository = module.get<RecipeRepository>(RecipeRepository);
  entityManager = module.get<EntityManager>(EntityManager);
})

afterEach(async () => {
  await entityManager.connection.close();
});
```
sqlite3
```typescript
let repository: RecipeRepository;
let entityManager: EntityManager;

beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
                dropSchema: true,
                synchronize: true,
                entities: [Recipe, Ingredient],
                logging: "all",
                keepConnectionAlive: false,
            }),
        ],
        providers: [RecipeRepository]
    }).compile();
    repository = module.get<RecipeRepository>(RecipeRepository);
    entityManager = module.get<EntityManager>(EntityManager);
})

afterEach(async () => {
    await entityManager.connection.close();
});
```


###Testing integrated with mysql wih atdatabases


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
Annotate the DTO with `@ApiProperty`, or enable introspection on `nest-cli.json`
```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": true
        }
      }
    ]
  }
}
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
