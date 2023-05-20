import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../models/user.model';

const expectedUser = new User(
  9,
  'tobias.funke@reqres.in',
  'Tobias',
  'Funke',
  'https://reqres.in/img/faces/9-image.jpg',
  'admin',
);

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('login should works', (done) => {
    service
      .login({
        email: 'fakekmail@email.com',
        password: 'fakepassword',
        rol: 'admin',
      })

      /* .subscribe((user) => {
        expect(user).toEqual(expectedUser), done();
      }); */

    httpTestingController
      .expectOne({
        url: `${service.apiUrl}/login`,
        method: 'POST',
      })
      .flush({
        token: 'QpwL5tke4Pnpja7X4',
      });

    httpTestingController.expectOne({
      url: `${service.apiUrl}/users/9`,
      method: 'GET',
    }).flush(
      {
        data: {
          id: 9,
          email: 'tobias.funke@reqres.in',
          first_name: 'Tobias',
          last_name: 'Funke',
          avatar: 'https://reqres.in/img/faces/9-image.jpg',
          rol: 'admin',
        },
        support: {
          url: 'https://reqres.in/#support-heading',
          text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
        }
      }
    )
  });
});