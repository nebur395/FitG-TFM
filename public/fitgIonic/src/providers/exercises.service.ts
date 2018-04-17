import 'rxjs/add/operator/toPromise';

import { Injectable }   from '@angular/core';
import { Storage }      from '@ionic/storage';

import { Api } from './api';

import { User } from '../models/User';
import { AerobicExercise } from '../models/AerobicExercise';

@Injectable()
export class ExercisesService {
  storage: Storage = new Storage(null);

  constructor(
    private api: Api
  ) { }

  getAerobicExercises(): any {
    return this.storage.get('user')
      .then((user: User) =>{
        return this.storage.get('token')
          .then(token => {
            let seq = this.api.get('aerobicExercises/', null, this.api.createReqOptsAuth(token)).share();
            seq.subscribe( () => {}, () => {});
            return seq;
          });
      });
  }

  getAnaerobicExercises(): any {
    return this.storage.get('user')
      .then((user: User) =>{
        return this.storage.get('token')
          .then(token => {
            let seq = this.api.get('anaerobicExercises/', null, this.api.createReqOptsAuth(token)).share();
            seq.subscribe( () => {}, () => {});
            return seq;
          });
      });
  }
}
