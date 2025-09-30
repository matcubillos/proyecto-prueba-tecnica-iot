import { Test, TestingModule } from '@nestjs/testing';
import { DeviceMetricsService } from './device-metrics.service';

describe('DeviceMetricsService', () => {
  let service: DeviceMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceMetricsService],
    }).compile();

    service = module.get<DeviceMetricsService>(DeviceMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
