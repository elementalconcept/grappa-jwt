import { GrappaJwtConfig, SessionManagerService } from '../public';

export const instances: Instances = {};

export interface Instances {
  sessionManagerService?: SessionManagerService | undefined;
  config?: GrappaJwtConfig | undefined;
}
