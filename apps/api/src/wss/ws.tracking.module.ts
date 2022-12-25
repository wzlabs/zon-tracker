import { Module } from '@nestjs/common';
import { WSTrackingGateway } from './ws.tracking.gateway';

@Module({
  providers: [WSTrackingGateway],
})
export class WSTrackingModule {}
