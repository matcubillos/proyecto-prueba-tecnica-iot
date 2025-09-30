import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './modules/devices/devices.module';
import { DeviceLocationModule } from './modules/device_location/device_location.module';
import { DeviceMetricsModule } from './modules/device-metrics/device-metrics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { runSeed } from './modules/seed/run-seed';
import { DeviceLogsModule } from './modules/device-logs/device-logs.module';
import { DeviceGateway } from './modules/devices/device.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //en este apartado se debe desarrollar la validacion del env, cuando se configure para produccion
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [join(__dirname , '**', '*.entity.{ts,js}')],
        migrations: ['src/config/migrations/*.ts'],
        //solo usar synchronize en desarrollo
        synchronize: true
      })
    }),
    DevicesModule, DeviceLocationModule, DeviceMetricsModule, DeviceLogsModule],
  controllers: [AppController],
  providers: [AppService, DeviceGateway],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
  ){}
  async onModuleInit() {
    await runSeed(this.dataSource);
  }
}
