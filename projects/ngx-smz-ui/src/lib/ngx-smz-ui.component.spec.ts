import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSmzUiComponent } from './ngx-smz-ui.component';

describe('NgxSmzUiComponent', () => {
  let component: NgxSmzUiComponent;
  let fixture: ComponentFixture<NgxSmzUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSmzUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSmzUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
