import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderSer: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loaderSer.setLoading(true);
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(error => {
        this.decreaseRequests();
        return throwError(error);
      })
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loaderSer.setLoading(false);
    }
  }
}

