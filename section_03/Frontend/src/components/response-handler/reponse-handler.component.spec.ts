import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseHandlerComponent } from './reponse-handler.component';

describe('ReponseHandlerComponent', () => {
  let component: ReponseHandlerComponent;
  let fixture: ComponentFixture<ReponseHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReponseHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
