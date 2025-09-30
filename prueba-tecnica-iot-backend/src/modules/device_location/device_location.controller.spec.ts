import { Test, TestingModule } from '@nestjs/testing';
import { DeviceLocationController } from './device_location.controller';
import { DeviceLocationService } from './device_location.service';

describe('DeviceLocationController', () => {
  let controller: DeviceLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceLocationController],
      providers: [DeviceLocationService],
    }).compile();

    controller = module.get<DeviceLocationController>(DeviceLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
