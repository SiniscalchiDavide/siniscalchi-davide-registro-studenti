import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inserimento } from './inserimento';

describe('Inserimento', () => {
  let component: Inserimento;
  let fixture: ComponentFixture<Inserimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inserimento],
    }).compileComponents();

    fixture = TestBed.createComponent(Inserimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
