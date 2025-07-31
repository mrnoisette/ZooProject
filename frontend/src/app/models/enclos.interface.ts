export interface Enclos {
  id: number;
  name: string;
  habitat: string;
  superficie: number;
  capacite: number;
  ouvert: boolean;
}

export interface CreateEnclosDto {
  name: string;
  habitat: string;
  superficie: number;
  capacite: number;
  ouvert?: boolean;
} 