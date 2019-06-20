import { PersistenceManager } from './persistence-manager';

const sessionKey = 'GRAPPA-JWT';

export class LocalStorage implements PersistenceManager{
  get(): string | null {
    return window.localStorage.getItem(sessionKey);
  }

  put(value: string) {
    window.localStorage.setItem(sessionKey, value);
  }

  remove() {
    window.localStorage.removeItem(sessionKey);
  }
}
