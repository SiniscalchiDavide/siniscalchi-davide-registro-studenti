import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaStudente } from './modifica-studente';

describe('ModificaStudente', () => {
  let component: ModificaStudente;
  let fixture: ComponentFixture<ModificaStudente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaStudente],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaStudente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
