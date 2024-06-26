import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: token },
    });
    return next(cloned);
  }
  return next(req);
};
