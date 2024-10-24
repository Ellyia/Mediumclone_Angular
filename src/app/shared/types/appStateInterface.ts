import {RouterReducerState} from '@ngrx/router-store';

import {AuthStateInterface} from '../../auth/types/authState.interface';
import {FeedStateInterface} from '../components/feed/types/feedState.interface';

export interface AppStateInterface {
  router?: RouterReducerState;
  auth: AuthStateInterface;
  feed: FeedStateInterface;
}
