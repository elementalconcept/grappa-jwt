import { inject, NgModule } from '@angular/core';

import { instances } from './internal/instances';

import { GrappaJwtConfig, GrappaJwtConfigToken, SessionManagerService } from './public';

@NgModule()
export class GrappaJwtModule {
  constructor() {
    instances.sessionManagerService = inject(SessionManagerService);
    instances.config = inject<GrappaJwtConfig>(GrappaJwtConfigToken);
  }
}
