import { Test, TestingModule } from '@nestjs/testing';
import { DeviceLogsController } from './device-logs.controller';
import { DeviceLogsService } from './device-logs.service';

describe('DeviceLogsController', () => {
  let controller: DeviceLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceLogsController],
      providers: [DeviceLogsService],
    }).compile();

    controller = module.get<DeviceLogsController>(DeviceLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
