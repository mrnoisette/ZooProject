import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AnimauxService } from '../../services/animaux.service';
import { Animal, CreateAnimalDto } from '../../models/animal.interface';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-animaux-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>🐾 Gestion des Animaux</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Formulaire d'ajout -->
          <div class="add-form" *ngIf="showAddForm">
            <h3>Ajouter un nouvel animal</h3>
            <form (ngSubmit)="addAnimal()" #animalForm="ngForm">
              <mat-form-field appearance="outline">
                <mat-label>Nom</mat-label>
                <input matInput [(ngModel)]="newAnimal.name" name="name" required>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Espèce</mat-label>
                <input matInput [(ngModel)]="newAnimal.species" name="species" required>
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Santé (0-100)</mat-label>
                <input matInput type="number" [(ngModel)]="newAnimal.health" name="health" min="0" max="100" required>
              </mat-form-field>
              
              <div class="form-actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="!animalForm.form.valid">
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
            <button mat-raised-button color="primary" (click)="showAddForm = !showAddForm">
              {{ showAddForm ? 'Masquer' : 'Ajouter un animal' }}
            </button>
            <button mat-raised-button color="accent" (click)="loadAnimaux()">
              Actualiser
            </button>
          </div>

          <!-- Tableau des animaux -->
          <div class="table-container">
            <table mat-table [dataSource]="animaux" class="mat-elevation-z8">
              <!-- Colonne ID -->
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>ID</th>
                <td mat-cell *matCellDef="let animal">{{ animal.id }}</td>
              </ng-container>

              <!-- Colonne Nom -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Nom</th>
                <td mat-cell *matCellDef="let animal">{{ animal.name }}</td>
              </ng-container>

              <!-- Colonne Espèce -->
              <ng-container matColumnDef="species">
                <th mat-header-cell *matHeaderCellDef>Espèce</th>
                <td mat-cell *matCellDef="let animal">{{ animal.species }}</td>
              </ng-container>

              <!-- Colonne Santé -->
              <ng-container matColumnDef="health">
                <th mat-header-cell *matHeaderCellDef>Santé</th>
                <td mat-cell *matCellDef="let animal">
                  <div class="health-container">
                    <span>{{ animal.health }}%</span>
                    <mat-progress-bar 
                      [value]="animal.health" 
                      [color]="animal.health > 70 ? 'primary' : animal.health > 30 ? 'accent' : 'warn'">
                    </mat-progress-bar>
                  </div>
                </td>
              </ng-container>

              <!-- Colonne Actions -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let animal">
                  <button mat-icon-button color="primary" (click)="soignerAnimal(animal.id)" 
                          matTooltip="Soigner l'animal" *ngIf="hasRole('veterinaire')">
                    <mat-icon>healing</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteAnimal(animal.id)" 
                          matTooltip="Supprimer l'animal" *ngIf="hasRole('gardien')">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>

          <!-- Message si aucun animal -->
          <div *ngIf="animaux.length === 0 && !loading" class="no-data">
            <p>Aucun animal trouvé.</p>
          </div>

          <!-- Loading -->
          <div *ngIf="loading" class="loading">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            <p>Chargement des animaux...</p>
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

    .form-actions {
      display: flex;
      gap: 8px;
    }

    .actions {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
    }

    .health-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .health-container span {
      font-size: 12px;
      font-weight: 500;
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
  `]
})
export class AnimauxListComponent implements OnInit {
  animaux: Animal[] = [];
  loading = false;
  showAddForm = false;
  newAnimal: CreateAnimalDto = {
    name: '',
    species: '',
    health: 100
  };
  displayedColumns: string[] = ['id', 'name', 'species', 'health', 'actions'];
  userRoles: string[] = [];

  constructor(
    private animauxService: AnimauxService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAnimaux();
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

  loadAnimaux(): void {
    this.loading = true;
    this.animauxService.getAllAnimaux().subscribe({
      next: (data) => {
        this.animaux = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des animaux:', error);
        this.snackBar.open('Erreur lors du chargement des animaux', 'Fermer', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  addAnimal(): void {
    if (this.newAnimal.name && this.newAnimal.species) {
      this.animauxService.createAnimal(this.newAnimal).subscribe({
        next: (animal) => {
          this.animaux.push(animal);
          this.newAnimal = { name: '', species: '', health: 100 };
          this.showAddForm = false;
          this.snackBar.open('Animal ajouté avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          this.snackBar.open('Erreur lors de l\'ajout de l\'animal', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  soignerAnimal(id: number): void {
    this.animauxService.soignerAnimal(id).subscribe({
      next: (animal) => {
        const index = this.animaux.findIndex(a => a.id === id);
        if (index !== -1) {
          this.animaux[index] = animal;
        }
        this.snackBar.open('Animal soigné avec succès!', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error('Erreur lors du soin:', error);
        this.snackBar.open('Erreur lors du soin de l\'animal', 'Fermer', { duration: 3000 });
      }
    });
  }

  deleteAnimal(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      this.animauxService.deleteAnimal(id).subscribe({
        next: () => {
          this.animaux = this.animaux.filter(a => a.id !== id);
          this.snackBar.open('Animal supprimé avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'animal', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
} 