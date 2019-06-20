import { Initialisable, Registry } from '@elemental-concept/grappa';

import { beforeFilter } from '../../internal/before-filter';

export function Authenticate() {
  return (constructor: Initialisable) => {
    Registry.registerBeforeFilter(constructor.prototype, beforeFilter, null);
  };
}
