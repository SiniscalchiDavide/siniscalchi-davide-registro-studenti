import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentiService } from '../services/studenti-service';
@Component({
  imports: [FormsModule],
  selector: 'app-inserimento',
  styleUrl: './inserimento.css',
  templateUrl: './inserimento.html',
})
export class Inserimento {
  private readonly studentiService = inject(StudentiService);
  private readonly router = inject(Router);
  readonly nome = signal('');
  readonly classe = signal('4B');
  readonly media = signal(6);
  salva(): void {
    this.studentiService.aggiungi(this.nome().trim(), this.classe().trim().toUpperCase(),Number(this.media()));
    this.router.navigate(['/elenco']);
  }
}