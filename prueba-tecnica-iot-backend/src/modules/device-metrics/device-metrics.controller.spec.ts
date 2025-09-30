import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMetricsController } from './device-metrics.controller';
import { DeviceMetricsService } from './device-metrics.service';

describe('DeviceMetricsController', () => {
  let controller: DeviceMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceMetricsController],
      providers: [DeviceMetricsService],
    }).compile();

    controller = module.get<DeviceMetricsController>(DeviceMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
