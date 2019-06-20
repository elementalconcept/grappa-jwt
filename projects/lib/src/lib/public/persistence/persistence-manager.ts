export interface PersistenceManager {
  put(value: string);

  get(): string | null;

  remove();
}
