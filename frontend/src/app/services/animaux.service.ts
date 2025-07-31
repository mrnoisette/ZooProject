import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal, CreateAnimalDto } from '../models/animal.interface';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AnimauxService {
  private apiUrl = 'http://localhost:3000/animaux';

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

  getAllAnimaux(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getAnimalById(id: number): Observable<Animal> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.get<Animal>(`${this.apiUrl}/${id}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }

  createAnimal(animal: CreateAnimalDto): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  deleteAnimal(id: number): Observable<any> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }

  soignerAnimal(id: number): Observable<Animal> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.get<Animal>(`${this.apiUrl}/soigner/${id}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }

  searchAnimalByName(name: string): Observable<Animal> {
    return new Observable(observer => {
      this.getAuthHeaders().subscribe(headers => {
        this.http.get<Animal>(`${this.apiUrl}/search/name?name=${name}`, { headers }).subscribe(
          data => observer.next(data),
          error => observer.error(error)
        );
      });
    });
  }
} 