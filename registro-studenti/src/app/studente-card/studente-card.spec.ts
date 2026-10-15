import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudenteCard } from './studente-card';

describe('StudenteCard', () => {
  let component: StudenteCard;
  let fixture: ComponentFixture<StudenteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudenteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StudenteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
