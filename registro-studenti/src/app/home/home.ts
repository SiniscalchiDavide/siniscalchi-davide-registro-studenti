import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentiService } from '../services/studenti-service';
import { StudenteCard } from '../studente-card/studente-card';

@Component({
  imports: [RouterLink, StudenteCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  readonly studentiService = inject(StudentiService);
}