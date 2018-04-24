import 'rxjs/add/operator/toPromise';

import { Injectable }   from '@angular/core';
import { Storage }      from '@ionic/storage';

import { Api } from './api';

import { AerobicMark } from '../models/AerobicMark';
import { AnaerobicMark } from '../models/AnaerobicMark';

@Injectable()
export class MarksService {
  storage: Storage = new Storage(null);

  constructor(
    private api: Api
  ) { }

  getAerobicMarks(exerciseId): any {
    return this.storage.get('token')
      .then(token => {
        let seq = this.api.get(
          'aerobicExercises/' + exerciseId + '/aerobicMarks/',
          null, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => {}, () => {});
        return seq;
      });
  }

  getAnaerobicMarks(exerciseId): any {
    return this.storage.get('token')
      .then(token => {
        let seq = this.api.get(
          'anaerobicExercises/' + exerciseId + '/anaerobicMarks/',
          null, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => {}, () => {});
        return seq;
      });
  }

  addAnaerobicMark(exerciseId, mark: AnaerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.post(
          'anaerobicExercises/' + exerciseId + '/anaerobicMarks/',
          mark, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  addAerobicMark(exerciseId, mark: AerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.post(
          'aerobicExercises/' + exerciseId + '/aerobicMarks/',
          mark, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  modifyAnaerobicMark(exerciseId, mark: AnaerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.put(
          'anaerobicExercises/' + exerciseId + '/anaerobicMarks/' + mark._id,
          mark, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  modifyAerobicMark(exerciseId, mark: AerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.put(
          'aerobicExercises/' + exerciseId + '/aerobicMarks/' + mark._id,
          mark, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  deleteAnaerobicMark(exerciseId, mark: AnaerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.delete(
          'anaerobicExercises/' + exerciseId + '/anaerobicMarks/' + mark._id,
          this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  deleteAerobicMark(exerciseId, mark: AerobicMark) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.delete(
          'aerobicExercises/' + exerciseId + '/aerobicMarks/' + mark._id,
          this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }
}
