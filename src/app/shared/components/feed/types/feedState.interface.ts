import {GetFeedResponseInterface} from './getFeedResponse.interface';

export interface FeedStateInterface {
  data: GetFeedResponseInterface | null;
  error: string | null;
  isLoading: boolean;
}
