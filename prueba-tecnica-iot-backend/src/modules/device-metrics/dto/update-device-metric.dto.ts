import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceMetricDto } from './create-device-metric.dto';

export class UpdateDeviceMetricDto extends PartialType(CreateDeviceMetricDto) {}
