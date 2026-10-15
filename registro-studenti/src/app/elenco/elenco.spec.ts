import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Elenco } from './elenco';

describe('Elenco', () => {
  let component: Elenco;
  let fixture: ComponentFixture<Elenco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elenco],
    }).compileComponents();

    fixture = TestBed.createComponent(Elenco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
