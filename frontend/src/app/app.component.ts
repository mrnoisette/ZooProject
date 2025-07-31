
// zoo-frontend/src/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AnimauxListComponent } from './components/animaux-list/animaux-list.component';
import { EnclosListComponent } from './components/enclos-list/enclos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    AnimauxListComponent,
    EnclosListComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  username: string | undefined;
  currentView: 'animaux' | 'enclos' = 'animaux';
  backendUrl = 'http://localhost:3000';

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log('🔐 ID Token Claims:', claims);
      this.username = claims?.name;
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  setView(view: 'animaux' | 'enclos') {
    this.currentView = view;
  }

  // Appel a mon backend NestJS : j'effectue un appel a une route protégée par un token d'authentification.
  testCallApi() {
    this.auth
      .getAccessTokenSilently({
        authorizationParams: {
          audience: this.backendUrl,
          scope: 'openid profile email',
        },
      })
      .subscribe((accessToken: string) => {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        console.log('📦 PAYLOAD TOKEN:', payload);
        console.log('🔐 Access Token:', accessToken);

        this.http
          .get(`${this.backendUrl}/animaux/1`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .subscribe((data) => {
            console.log('🐾 Réponse API sur une route protégée:', data);
          });
      });
  }
}
