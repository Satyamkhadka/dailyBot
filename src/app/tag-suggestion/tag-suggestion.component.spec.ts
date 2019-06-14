import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSuggestionComponent } from './tag-suggestion.component';

describe('TagSuggestionComponent', () => {
  let component: TagSuggestionComponent;
  let fixture: ComponentFixture<TagSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
