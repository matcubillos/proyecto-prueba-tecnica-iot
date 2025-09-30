import { Test, TestingModule } from '@nestjs/testing';
import { DeviceLocationService } from './device_location.service';

describe('DeviceLocationService', () => {
  let service: DeviceLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceLocationService],
    }).compile();

    service = module.get<DeviceLocationService>(DeviceLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
