import {createAction, props} from '@ngrx/store';

import {ActionTypes} from './actionTypes';
import {GetPopularTagsResponseInterface} from '../../types/get-popular-tags-response.interface';
import {PopularTagType} from '../../../../types/popularTag.type';

export const getPopularTagsAction = createAction(
  ActionTypes.GET_POPULAR_TAGS,
  props<{url: string}>()
);

export const getPopularTagsSuccessAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{popularTags: PopularTagType[]}>()
);

export const getPopularTagsFailureAction = createAction(
  ActionTypes.GET_POPULAR_TAGS_FAILURE,
  props<{error: string}>()
);
