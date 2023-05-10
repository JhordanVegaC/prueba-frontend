import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFirmaComponent } from './agregar-firma.component';

describe('AgregarFirmaComponent', () => {
  let component: AgregarFirmaComponent;
  let fixture: ComponentFixture<AgregarFirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFirmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
