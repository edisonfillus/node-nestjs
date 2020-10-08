import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                "PORT": Joi.number().required(),
                "JWT_SECRET": Joi.string().required()
            })
        }),
        UsersModule,
        ProductsModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'sqljs' as 'sqljs',
                synchronize: true,
                entities: [__dirname + '/**/*.entity.{ts,js}'],
                logging: "all"
            })
        }),
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
