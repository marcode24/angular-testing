import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';

fdescribe('AuthService', () => {

  let authService: AuthService;
  let httpController: HttpTestingController; // This is a mock of the HttpClient service
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        TokenService
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login function', () => {
    it('should return an access token', (doneFn) => {

      const mockData: Auth = {
        access_token: '1234567890',
      };

      const email = 'example@gmail.com'
      const password = '1234567890'

      authService.login(email, password).subscribe((auth) => {
        expect(auth.access_token).toEqual(mockData.access_token);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should save the token in the token service', (doneFn) => {
      const mockData: Auth = {
        access_token: '1234567890',
      };

      const email = 'example@gmail.com'
      const password = '1234567890'

      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((auth) => {
        expect(auth.access_token).toEqual(mockData.access_token);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(mockData.access_token);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });
});
