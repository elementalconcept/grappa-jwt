import { Inject, NgModule } from '@angular/core';

import { instances } from './internal/instances';

import { GrappaJwtConfig, GrappaJwtConfigToken, SessionManagerService } from './public';

@NgModule()
export class GrappaJwtModule {
  constructor(private readonly sessionManagerService: SessionManagerService,
              @Inject(GrappaJwtConfigToken) private readonly config: GrappaJwtConfig) {
    instances.sessionManagerService = sessionManagerService;
    instances.config = config;
  }
}
