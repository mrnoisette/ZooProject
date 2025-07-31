import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enclos, CreateEnclosDto } from '../models/enclos.interface';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class EnclosService {
  private apiUrl = 'http://localhost:3000/enclos';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private getAuthHeaders(): Observable<HttpHeaders> {
    return new Observable(observer => {
      this.auth.getAccessTokenSilently({
        authorizationParams: {
          audience: 'http://localhost:3000',
          scope: 'openid profile email',
        },
      }).subscribe(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        observer.next(headers);
        observer.complete();
      });
    });
  }

  getAllEnclos(): Observable<Enclos[]> {
    return this.http.get<Enclos[]>(this.apiUrl);
  }

  getEnclosById(id: number): Observable<Enclos> {
    return this.http.get<Enclos>(`${this.apiUrl}/${id}`);
  }

  createEnclos(enclos: CreateEnclosDto): Observable<Enclos> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.post<Enclos>(this.apiUrl, enclos, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }

  updateEnclos(id: number, enclos: Partial<CreateEnclosDto>): Observable<Enclos> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.put<Enclos>(`${this.apiUrl}/${id}`, enclos, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }

  deleteEnclos(id: number): Observable<any> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }
} 