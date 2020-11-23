import { Inject, Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GrappaJwtConfig, GrappaJwtConfigToken } from '../../models/grappa-jwt-config';

@Injectable({ providedIn: 'root' })
export class SessionManagerService {
  private lastToken: string | null | undefined;
  private token$ = new ReplaySubject<string | null>(1);
  private authorisationChanges$ = this.token$.pipe(map(token => this.tokenIsNotEmpty(token)));

  constructor(@Inject(GrappaJwtConfigToken) private readonly config: GrappaJwtConfig) {
    this.token = this.config.persistence.get();
  }

  set token(value: string) {
    this.lastToken = value;

    if (this.tokenIsNotEmpty(this.lastToken)) {
      this.config.persistence.put(this.lastToken);
    } else {
      this.config.persistence.remove();
    }

    this.token$.next(this.lastToken);
  }

  get token(): string | null {
    return this.lastToken;
  }

  get authorised() {
    return this.tokenIsNotEmpty(this.lastToken);
  }

  clear() {
    this.lastToken = null;
    this.config.persistence.remove();
    this.token$.next(null);
  }

  tokenChanges(): Observable<string> {
    return this.token$.asObservable();
  }

  authorisationChanges(): Observable<boolean> {
    return this.authorisationChanges$;
  }

  private tokenIsNotEmpty(token: string | null | undefined) {
    return typeof token === 'string' && token.length > 0;
  }
}
