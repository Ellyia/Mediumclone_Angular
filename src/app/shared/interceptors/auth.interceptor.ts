import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

import {PersistanceServise} from '../services/persistance.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const presistanceServise = inject(PersistanceServise);
  const token = presistanceServise.get('accessToken');

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(modifiedReq);
};
