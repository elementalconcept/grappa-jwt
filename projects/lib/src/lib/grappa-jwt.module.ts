import { Inject, NgModule } from '@angular/core';

import { instances } from './internal/instances';

import { GrappaJwtConfig, GrappaJwtConfigToken } from './public/models/grappa-jwt-config';
import { SessionManagerService } from './public/services/session-manager/session-manager.service';

@NgModule()
export class GrappaJwtModule {
  constructor(private readonly sessionManagerService: SessionManagerService,
              @Inject(GrappaJwtConfigToken) private readonly config: GrappaJwtConfig) {
    instances.sessionManagerService = sessionManagerService;
    instances.config = config;
  }
}
