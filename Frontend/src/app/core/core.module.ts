// Angular ===================================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Translate =================================================================
import { TranslateModule } from '@ngx-translate/core';
// Locals ====================================================================
import { JWTInterceptor } from './interceptors/tokens.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    TranslateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ]
})
export class CoreModule { }
