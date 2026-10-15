import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Studente } from '../modelli/studente';
import { StudentiService } from '../services/studenti-service';
import { StudenteCard } from '../studente-card/studente-card';
@Component({
  imports: [RouterLink, StudenteCard],
  selector: 'app-dettaglio-studente',
  styleUrl: './dettaglio-studente.css',
  templateUrl: './dettaglio-studente.html',
})
export class DettaglioStudente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentiService = inject(StudentiService);
  readonly studente = signal<Studente | undefined>(undefined);
  ngOnInit(): void {
    this.route.paramMap.subscribe(parametri => {
      const id = Number(parametri.get('id'));
      const trovato = this.studentiService.trova(id);
      if (trovato) {
        this.studente.set(trovato);
      } else {
        this.router.navigate(['/elenco']);
      }
    });
  }
  successivo(): void {
    const attuale = this.studente();
    if (!attuale) {
      return;
    }
    const prossimo = this.studentiService.successivo(attuale.id);
    if (prossimo) {
      this.router.navigate(['/elenco', prossimo.id]);
    }
  }
  rimuovi(s: Studente): void {
    this.studentiService.rimuovi(s.id);
    this.router.navigate(['/elenco']);
  }
}