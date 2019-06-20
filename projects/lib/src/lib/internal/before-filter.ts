import { RestRequest } from '@elemental-concept/grappa';

import { instances } from './instances';

export function beforeFilter(request: RestRequest) {
  if (instances.sessionManagerService.authorised) {
    request.headers[ instances.config.headerName ] = instances.sessionManagerService.token;
  }
}
