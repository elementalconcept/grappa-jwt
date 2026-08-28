import { EMPTY } from 'rxjs';

import { GET, Registry, RestClient, RestRequest } from '@elemental-concept/grappa';

import { instances } from '../../internal/instances';
import { GrappaJwtConfig } from '../models';
import { SessionManagerService } from '../services/session-manager/session-manager.service';
import { Authenticate } from './authenticate';

@RestClient('http://localhost/')
@Authenticate()
class TestApi {
  @GET('/things')
  getThings: () => any;
}

// Exercises the actual cross-package integration point between grappa-jwt's
// @Authenticate() and grappa's Registry directly (registering a fake HTTP client
// via Registry.registerAlternativeHttpClient), instead of going through
// GrappaModule/HttpClientTestingModule — see the note on the pre-existing
// GrappaModule + HttpClientTestingModule NG0203 issue when consuming the
// partial-Ivy-compiled package across separate Angular CLI workspaces.
describe('Authenticate', () => {
  let capturedRequest: RestRequest | undefined;
  let sessionManagerService: { authorised: boolean; token: string | null };

  beforeEach(() => {
    capturedRequest = undefined;
    sessionManagerService = { authorised: false, token: null };

    instances.sessionManagerService = sessionManagerService as unknown as SessionManagerService;
    instances.config = { headerName: 'Authorization' } as GrappaJwtConfig;

    const metadata = (TestApi as any)[ Symbol.metadata ];

    Registry.registerAlternativeHttpClient(metadata, {
      request: (request: RestRequest) => {
        capturedRequest = request;

        return EMPTY;
      }
    });
  });

  it('injects the Authorization header once the session is authorised', () => {
    sessionManagerService.authorised = true;
    sessionManagerService.token = 'abc123';

    new TestApi().getThings();

    expect(capturedRequest?.headers[ 'Authorization' ]).toBe('abc123');
  });

  it('does not touch the Authorization header when the session is not authorised', () => {
    sessionManagerService.authorised = false;

    new TestApi().getThings();

    expect(capturedRequest?.headers[ 'Authorization' ]).toBeUndefined();
  });
});
