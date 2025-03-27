import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPageFrameComponent } from './init-page-frame.component';

describe('InitPageFrameComponent', () => {
  let component: InitPageFrameComponent;
  let fixture: ComponentFixture<InitPageFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitPageFrameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitPageFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
