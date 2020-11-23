# Grappa Jwt

Decorator-powered REST client for Angular 5+ and its HttpClient for handling JWT.

## Installation

With npm:

```Shell
$ npm i --save @elemental-concept/grappa-jwt
```

With Yarn:

```Shell
$ yarn add @elemental-concept/grappa-jwt
```

Then add `GrappaModule` to your project `NgModule`

```typescript
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    ...,
    GrappaAuthModule
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Introduction

Grappa JWT provide a easy and automatic way of using JWT in your HttpClient.
To be able to use is you need to pass the token to the `SessionManagerService`:

```typescript
@Injectable())
export class JWTService {
  constructor(sessionManagerService: SessionManagerService) { }

  login() {
    this.someService
      .login(request)
      .subscribe(
        response => !!response.token
          ? this.authSuccess(response)
          : this.authError(),
        () => this.authError());
  }

  private authSuccess(response: Response) {
    this.sessionManagerService.token = `Bearer ${response.token}`;
    // do somehting
  }
  
  private authError() {
    //  error handling
  }
```

You can use GrappaJwt with Grappa to have the full potential:

```typescript
@Injectable()
@RestClient('http://example.com/api/')
@Authenticate()
export class UserService {
  @GET('/users')
  list: () => Observable<User[]>;

  @GET('/users/{0}')
  find: (id: number) => Observable<User>;

  @POST('/users')
  create: (user: User) => Observable<User>;

  @PUT('/users/{0}')
  update: (id: number, user: User) => Observable<User>;
}
```

### Example of expiration handling

if you want somehthing

```typescript
@Injectable()
@RestClient('http://example.com/api/')
@Authenticate()
export class UserService {
  constructor(sessionManagerService: SessionManagerService, router: Router) { }

  @GET('/users')
  list: () => Observable<User[]>;

  @GET('/users/{0}')
  find: (id: number) => Observable<User>;

  @POST('/users')
  create: (user: User) => Observable<User>;

  @PUT('/users/{0}')
  update: (id: number, user: User) => Observable<User>;

  @AfterRequest()
  expirationFilter(observable: Observable<any>) {
    return observable.pipe(catchError(e => this.deauthorise(e)));
  }

  private deauthorise(e) {
    if (e.status === 401 || e.status === 403) {
      this.sessionManagerService.clear();
      this.router.navigate([ '' ]).then();
    }

    return throwError(e);
  }
}
```

### Custom Storage

by default GrappaJwt will use `window.sessionStorage`, but you can use it with other storage. The Ionic Storage is a good example:

You first need to add a new `PersistenceManager` using the Ionic Storage.
Remeber to user `GRAPPA-JWT` as key.

```typescript
export class PersistenceManager {
  constructor(private readonly storage: Storage) { }

  put(value: string) {
    return this.storage.set('GRAPPA-JWT', value);
  }

  get() {
    return this.storage.get('GRAPPA-JWT');
  }

  remove() {
    this.storage.remove('GRAPPA-JWT');
  }
}
```

Then you have to create a factory to create a `GrappaAuthConfigToken`

```typescript
export function grappaConfigFactory(storage: Storage) {
	return {
		persistence: new PersistenceManager(storage)
	};
}
```

Finally, provide the `GrappaAuthConfigToken` using the `grappaConfigFactory` you created, passing `Storage` into the dependencies:


```typescript
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    ...,
    IonicStorageModule.forRoot(),

    GrappaAuthModule,
    GrappaModule,
  ],
  providers: [
    { 
      provide: GrappaAuthConfigToken,
      useFactory: grappaConfigFactory,
      deps:[ Storage ]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

