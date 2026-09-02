import { Initialisable, Registry } from '@elemental-concept/grappa';

import { beforeFilter } from '../../internal/before-filter';

export function Authenticate() {
  return (constructor: Initialisable, context: ClassDecoratorContext) => {
    Registry.registerBeforeFilter(context.metadata, beforeFilter, null);
  };
}
