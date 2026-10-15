import { Component, input, output } from '@angular/core';
import { Studente } from '../modelli/studente';
@Component({
  imports: [],
  selector: 'app-studente-card',
  styleUrl: './studente-card.css',
  templateUrl: './studente-card.html',
  host: { class: 'card' },
})
export class StudenteCard {
  readonly studente = input.required<Studente>();
  readonly azioni = input(true);
  readonly rimosso = output<Studente>();
  rimuovi(): void {
    this.rimosso.emit(this.studente());
  }
}