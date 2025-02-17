import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';


// import { JobEffects } from './store/job/job.effects';
import { jobsReducer } from './store/job/job.reducer';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideHttpClient(withInterceptors([loadingInterceptor])),
  importProvidersFrom([BrowserAnimationsModule]),
  provideToastr()
  , provideStore({
        job: jobsReducer
    }), provideEffects([])]
};
