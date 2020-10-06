import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [
    UsersModule, 
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'sqljs',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      logging: "all"
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
