import { InjectionToken } from '@angular/core';

import { PersistenceManager, SessionStorage } from '../persistence';

export interface GrappaJwtConfig {
  persistence?: PersistenceManager;
  headerName?: string;
  authRefresh?: boolean;
}

export const GrappaJwtConfigToken = new InjectionToken<GrappaJwtConfig>(
  'GrappaJwtConfigToken',
  {
    factory: (): GrappaJwtConfig => ({
      persistence: new SessionStorage(),
      headerName: 'Authorization',
      authRefresh: false
    }),
    providedIn: 'root'
  });
