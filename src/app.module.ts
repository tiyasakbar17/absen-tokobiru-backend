import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/interface/auth.module';
import { AbsenModule } from './absen/interface/absen.module';

@Module({
  imports: [AuthModule, AbsenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
