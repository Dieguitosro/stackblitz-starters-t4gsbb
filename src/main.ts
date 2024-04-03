import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet, provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'zone.js';
import { HttpErrorInterceptor } from './app/core/interceptors/http-error.interceptor';
import { LoaderSpinnerService } from './app/core/services/loader-spinner.service';
import { UsersService } from './app/core/services/users.service';
import LoaderSpinnerComponent from './app/shared/components/loader-spinner/loader-spinner.component';
import { routes } from './app/core/config/app-config';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TranslateModule, LoaderSpinnerComponent],
  standalone: true,
  template: `
    <div>
      <app-loader-spinner></app-loader-spinner>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang() ?? 'en';
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }
}



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([HttpErrorInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ), 
    provideAnimationsAsync(),
    UsersService,
    LoaderSpinnerService
  ],
});
