import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WSTrackingModule } from './wss/ws.tracking.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { TasksModule } from './tasks/tasks.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:<password>@cluster0.lfddd.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
    BlogsModule,
    TasksModule,
    TrackingModule,
    WSTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
