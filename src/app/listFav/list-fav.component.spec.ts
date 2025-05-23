import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavComponent } from './list-fav.component';

describe('ListFavComponent', () => {
  let component: ListFavComponent;
  let fixture: ComponentFixture<ListFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
