import {GetFeedResponseInterface} from './get-feed-response.interface';

export interface FeedStateInterface {
  data: GetFeedResponseInterface | null;
  error: string | null;
  isLoading: boolean;
}
