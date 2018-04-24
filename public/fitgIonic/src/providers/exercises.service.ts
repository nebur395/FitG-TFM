import 'rxjs/add/operator/toPromise';

import { Injectable }   from '@angular/core';
import { Storage }      from '@ionic/storage';

import { Api } from './api';

import { AerobicExercise } from '../models/AerobicExercise';
import { AnaerobicExercise } from '../models/AnaerobicExercise';

@Injectable()
export class ExercisesService {
  storage: Storage = new Storage(null);

  constructor(
    private api: Api
  ) { }

  getAerobicExercises(): any {
      return this.storage.get('token')
        .then(token => {
          let seq = this.api.get('aerobicExercises/', null, this.api.createReqOptsAuth(token)).share();
          seq.subscribe( () => {}, () => {});
          return seq;
        });
  }

  getAnaerobicExercises(): any {
      return this.storage.get('token')
        .then(token => {
          let seq = this.api.get('anaerobicExercises/', null, this.api.createReqOptsAuth(token)).share();
          seq.subscribe( () => {}, () => {});
          return seq;
        });
  }

  addAnaerobicExercise(exercise: AnaerobicExercise) {
      return this.storage.get('token')
        .then((token) => {
        let seq = this.api.post('anaerobicExercises/', exercise, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  addAerobicExercise(exercise: AerobicExercise) {
        return this.storage.get('token')
          .then((token) => {
            let seq = this.api.post('aerobicExercises/', exercise, this.api.createReqOptsAuth(token)).share();
            seq.subscribe( () => { }, () => { } );
            return seq;
          });
  }

  modifyAnaerobicExercise(exercise: AnaerobicExercise) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.put('anaerobicExercises/' + exercise._id, exercise, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  modifyAerobicExercise(exercise: AerobicExercise) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.put('aerobicExercises/' + exercise._id, exercise, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  deleteAnaerobicExercise(exercise: AnaerobicExercise) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.delete('anaerobicExercises/' + exercise._id, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  deleteAerobicExercise(exercise: AerobicExercise) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.delete('aerobicExercises/' + exercise._id, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }
}
