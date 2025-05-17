import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeFavsComponent } from './youtube-favs.component';

describe('YoutubeFavsComponent', () => {
  let component: YoutubeFavsComponent;
  let fixture: ComponentFixture<YoutubeFavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeFavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
