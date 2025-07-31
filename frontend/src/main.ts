// zoo-frontend/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-olqv50uydsnq4btw.us.auth0.com', 
      clientId: 'WWqEbcaUKn6v57GvgmOv8J7Ydw4I52G3',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'http://localhost:3000',
        scope: 'openid profile email',
      },
    }),
  ],
});
