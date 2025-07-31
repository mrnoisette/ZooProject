import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EnclosService } from '../../services/enclos.service';
import { Enclos, CreateEnclosDto } from '../../models/enclos.interface';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-enclos-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>🏠 Gestion des Enclos</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Formulaire d'ajout -->
          <div class="add-form" *ngIf="showAddForm">
            <h3>Ajouter un nouvel enclos</h3>
            <form (ngSubmit)="addEnclos()" #enclosForm="ngForm">
              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput [(ngModel)]="newEnclos.name" name="name" required>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Habitat</mat-label>
                <input matInput [(ngModel)]="newEnclos.habitat" name="habitat" required>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Superficie (m²)</mat-label>
                <input matInput type="number" [(ngModel)]="newEnclos.superficie" name="superficie" min="1" required>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Capacité</mat-label>
                <input matInput type="number" [(ngModel)]="newEnclos.capacite" name="capacite" min="1" required>
              </mat-form-field>
              
              <div class="checkbox-container">
                <mat-checkbox [(ngModel)]="newEnclos.ouvert" name="ouvert">
                  Ouvert au public
                </mat-checkbox>
              </div>
              
              <div class="form-actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="!enclosForm.form.valid">
                  Ajouter
                </button>
                <button mat-button type="button" (click)="showAddForm = false">
                  Annuler
                </button>
              </div>
            </form>
          </div>

          <!-- Boutons d'action -->
          <div class="actions">
            <button mat-raised-button color="primary" (click)="showAddForm = !showAddForm" *ngIf="hasRole('gardien')">
              {{ showAddForm ? 'Masquer' : 'Ajouter un enclos' }}
            </button>
            <button mat-raised-button color="accent" (click)="loadEnclos()">
              Actualiser
            </button>
          </div>

          <!-- Grille des enclos -->
          <div class="enclos-grid">
            <mat-card *ngFor="let enclos of enclos" class="enclos-card">
              <mat-card-header>
                <mat-card-title>{{ enclos.name }}</mat-card-title>
                <mat-card-subtitle>{{ enclos.habitat }}</mat-card-subtitle>
              </mat-card-header>
              
              <mat-card-content>
                <div class="enclos-info">
                  <div class="info-item">
                    <strong>Superficie:</strong> {{ enclos.superficie }} m²
                  </div>
                  <div class="info-item">
                    <strong>Capacité:</strong> {{ enclos.capacite }} animaux
                  </div>
                  <div class="info-item">
                    <strong>Statut:</strong>
                    <mat-chip [color]="enclos.ouvert ? 'primary' : 'warn'" selected>
                      {{ enclos.ouvert ? 'Ouvert' : 'Fermé' }}
                    </mat-chip>
                  </div>
                </div>
              </mat-card-content>
              
              <mat-card-actions *ngIf="hasRole('gardien')">
                <button mat-button color="primary" (click)="editEnclos(enclos)">
                  <mat-icon>edit</mat-icon>
                  Modifier
                </button>
                <button mat-button color="warn" (click)="deleteEnclos(enclos.id)">
                  <mat-icon>delete</mat-icon>
                  Supprimer
                </button>
              </mat-card-actions>
            </mat-card>
          </div>

          <!-- Message si aucun enclos -->
          <div *ngIf="enclos.length === 0 && !loading" class="no-data">
            <p>Aucun enclos trouvé.</p>
          </div>

          <!-- Loading -->
          <div *ngIf="loading" class="loading">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            <p>Chargement des enclos...</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .add-form {
      margin-bottom: 20px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .add-form h3 {
      margin-top: 0;
      color: #333;
    }

    .add-form form {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-end;
    }

    .checkbox-container {
      margin-top: 16px;
    }

    .form-actions {
      display: flex;
      gap: 8px;
    }

    .actions {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }

    .enclos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .enclos-card {
      transition: transform 0.2s ease-in-out;
    }

    .enclos-card:hover {
      transform: translateY(-2px);
    }

    .enclos-info {
      margin-top: 16px;
    }

    .info-item {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .loading {
      text-align: center;
      padding: 20px;
    }

    .loading p {
      margin-top: 10px;
      color: #666;
    }

    mat-form-field {
      min-width: 200px;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      gap: 8px;
    }
  `]
})
export class EnclosListComponent implements OnInit {
  enclos: Enclos[] = [];
  loading = false;
  showAddForm = false;
  newEnclos: CreateEnclosDto = {
    name: '',
    habitat: '',
    superficie: 0,
    capacite: 0,
    ouvert: true
  };
  userRoles: string[] = [];

  constructor(
    private enclosService: EnclosService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEnclos();
    this.loadUserRoles();
  }

  loadUserRoles(): void {
    this.auth.idTokenClaims$.subscribe(claims => {
      this.userRoles = claims?.['https://zoo-app.com/roles'] || claims?.['roles'] || [];
    });
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  loadEnclos(): void {
    this.loading = true;
    this.enclosService.getAllEnclos().subscribe({
      next: (data) => {
        this.enclos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des enclos:', error);
        this.snackBar.open('Erreur lors du chargement des enclos', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  addEnclos(): void {
    if (this.newEnclos.name && this.newEnclos.habitat && this.newEnclos.superficie > 0 && this.newEnclos.capacite > 0) {
      this.enclosService.createEnclos(this.newEnclos).subscribe({
        next: (enclos) => {
          this.enclos.push(enclos);
          this.newEnclos = { name: '', habitat: '', superficie: 0, capacite: 0, ouvert: true };
          this.showAddForm = false;
          this.snackBar.open('Enclos ajouté avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          this.snackBar.open('Erreur lors de l\'ajout de l\'enclos', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  editEnclos(enclos: Enclos): void {
    // Pour simplifier, on utilise un prompt pour modifier
    const newName = prompt('Nouveau nom:', enclos.name);
    if (newName && newName !== enclos.name) {
      this.enclosService.updateEnclos(enclos.id, { name: newName }).subscribe({
        next: (updatedEnclos) => {
          const index = this.enclos.findIndex(e => e.id === enclos.id);
          if (index !== -1) {
            this.enclos[index] = updatedEnclos;
          }
          this.snackBar.open('Enclos modifié avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          this.snackBar.open('Erreur lors de la modification de l\'enclos', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  deleteEnclos(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enclos ?')) {
      this.enclosService.deleteEnclos(id).subscribe({
        next: () => {
          this.enclos = this.enclos.filter(e => e.id !== id);
          this.snackBar.open('Enclos supprimé avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'enclos', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
} 