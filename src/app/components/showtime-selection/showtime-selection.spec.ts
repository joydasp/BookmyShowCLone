import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeSelection } from './showtime-selection';

describe('ShowtimeSelection', () => {
  let component: ShowtimeSelection;
  let fixture: ComponentFixture<ShowtimeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimeSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
