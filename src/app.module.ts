import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ChipModule } from './chip/chip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [],
      inject: [],
      useFactory: async () => ({
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
        },
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        // sortSchema: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        // TODO implement -> context() {},
      }),
    }),
    ProductModule,
    CategoryModule,
    SubCategoryModule,
    ChipModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
