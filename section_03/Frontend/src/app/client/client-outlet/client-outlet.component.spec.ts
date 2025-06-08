import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOutletComponent } from './client-outlet.component';

describe('ClientOutletComponent', () => {
  let component: ClientOutletComponent;
  let fixture: ComponentFixture<ClientOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
