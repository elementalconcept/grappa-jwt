import { SessionManagerService } from '../public/services/session-manager/session-manager.service';
import { GrappaJwtConfig } from '../public/models/grappa-jwt-config';

export const instances: Instances = {};

export interface Instances {
  sessionManagerService?: SessionManagerService | undefined;
  config?: GrappaJwtConfig | undefined;
}
