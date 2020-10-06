import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {ProductsModule} from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm/dist';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
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
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
