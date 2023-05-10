import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSlimComponent } from './sidebar-slim.component';

describe('SidebarComponent', () => {
  let component: SidebarSlimComponent;
  let fixture: ComponentFixture<SidebarSlimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSlimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
