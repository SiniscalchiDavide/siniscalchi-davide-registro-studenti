import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentiService } from '../services/studenti-service';

@Component({
  imports: [FormsModule],
  selector: 'app-modifica-studente',
  styleUrl: './modifica-studente.css',
  templateUrl: './modifica-studente.html',
})
export class ModificaStudente implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentiService = inject(StudentiService);

  readonly id = signal<number>(0);
  readonly nome = signal('');
  readonly classe = signal('');
  readonly media = signal(6);

  ngOnInit(): void {

    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    const trovato = this.studentiService.trova(idParam);

    if (trovato) {
      this.id.set(trovato.id);
      this.nome.set(trovato.nome);
      this.classe.set(trovato.classe);
      this.media.set(trovato.mediaVoti);
    } else {
      this.router.navigate(['/elenco']);
    }
  }

  salva(): void {
    this.studentiService.aggiorna({
      id: this.id(),
      nome: this.nome().trim(),
      classe: this.classe().trim().toUpperCase(),
      mediaVoti: Number(this.media()),
    });

    this.router.navigate(['/elenco', this.id()]);
  }
}