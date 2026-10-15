import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentiService } from '../services/studenti-service';

@Component({
  imports: [FormsModule],
  selector: 'app-elenco',
  styleUrl: './elenco.css',
  templateUrl: './elenco.html',
})
export class Elenco {
  private readonly studentiService = inject(StudentiService);
  readonly filtroClasse = signal('');

  readonly filtrati = computed(() => {
    const filtro = this.filtroClasse().trim().toUpperCase();
    const tutti = this.studentiService.studenti();
    if (filtro === '') {
      return tutti;
    }
    return tutti.filter(s => s.classe.toUpperCase() === filtro);
  });

  readonly mediaClasse = computed(() => {
    const lista = this.filtrati();
    if (lista.length === 0) {
      return 0;
    }
    const somma = lista.reduce((acc, s) => acc + s.mediaVoti, 0);
    return somma / lista.length;
  });

  rimuovi(id: number): void {
    this.studentiService.rimuovi(id);
  }
}