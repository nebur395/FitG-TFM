import 'rxjs/add/operator/toPromise';

import { Injectable }   from '@angular/core';
import { Storage }      from '@ionic/storage';

import { Api } from './api';

import { BodyAnalysis } from '../models/BodyAnalysis';

@Injectable()
export class AnalysisService {
  storage: Storage = new Storage(null);

  constructor(
    private api: Api
  ) { }

  getBodyAnalysis(): any {
    return this.storage.get('token')
      .then(token => {
        let seq = this.api.get('bodyAnalysis/', null, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => {}, () => {});
        return seq;
      });
  }

  addBodyAnalysis(analysis: BodyAnalysis) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.post('bodyAnalysis/', analysis, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  modifyBodyAnalysis(analysis: BodyAnalysis) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.put('bodyAnalysis/' + analysis._id, analysis, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }

  deleteBodyAnalysis(analysis: BodyAnalysis) {
    return this.storage.get('token')
      .then((token) => {
        let seq = this.api.delete('bodyAnalysis/' + analysis._id, this.api.createReqOptsAuth(token)).share();
        seq.subscribe( () => { }, () => { } );
        return seq;
      });
  }
}
