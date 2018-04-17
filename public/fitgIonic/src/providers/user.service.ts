import 'rxjs/add/operator/toPromise';

import { Injectable }   from '@angular/core';
import { Storage }      from '@ionic/storage';
import { JwtHelper }    from 'angular2-jwt';

import { Api } from './api';

import { User } from '../models/User';

@Injectable()
export class UserService {
  storage: Storage = new Storage(null);
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private api: Api
  ) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login/', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      this.storage.set('token', res.token);
      const user = this.jwtHelper.decodeToken(res.token) as User;
      this.storage.set('user', user);
    }, () => { });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('users/', accountInfo).share();
    seq.subscribe(() => {}, () => {});
    return seq;
  }

  updateUser(accountInfo: any): any {
    return this.storage.get('user')
      .then((user: User) =>{
        return this.storage.get('token')
          .then(token => {
            let seq = this.api.put('users/' + user._id, accountInfo, this.api.createReqOptsAuth(token)).share();
            seq.subscribe( () => {
              user.username = accountInfo.username;
              user.email = accountInfo.email;
              this.storage.set('user',user);
            }, () => {});
            return seq;
          });
      });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout(): Promise<void> {
    return this.storage.remove('token').then(
      () => {
        return this.storage.remove('user')
      }
    );
  }

  /**
   * Process a login/signup response to store user data
   */
  checkLogged(): Promise<boolean> {
    return this.storage.get('token').then((token) => {
      return (token !== null &&
        !this.jwtHelper.isTokenExpired(token))
    });
  }
}
