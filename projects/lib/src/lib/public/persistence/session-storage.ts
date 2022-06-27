import { PersistenceManager } from './persistence-manager';

const sessionKey = 'GRAPPA-JWT';

export class SessionStorage implements PersistenceManager {
  get = (): string | null => window.sessionStorage.getItem(sessionKey);

  put = (value: string) => window.sessionStorage.setItem(sessionKey, value);

  remove = () => window.sessionStorage.removeItem(sessionKey);
}
