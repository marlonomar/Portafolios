import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubtitleComponent } from './category-subtitle.component';

describe('CategorySubtitleComponent', () => {
  let component: CategorySubtitleComponent;
  let fixture: ComponentFixture<CategorySubtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySubtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
