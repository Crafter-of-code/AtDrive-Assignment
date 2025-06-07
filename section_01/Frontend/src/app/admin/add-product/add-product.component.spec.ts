import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { HttpserviceService } from '../httpservice.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockHttpService: jasmine.SpyObj<HttpserviceService>;
  let form: NgForm;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpserviceService', ['addProduct']);

    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [FormsModule],
      providers: [{ provide: HttpserviceService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    mockHttpService = TestBed.inject(
      HttpserviceService
    ) as jasmine.SpyObj<HttpserviceService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addProduct and resetForm on form submission', () => {
    // Create a mock form object
    const mockForm = {
      value: {
        name: 'Test Product',
        price: 100,
        discription: 'Test description',
      },
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;

    component.onSubmitProductDiscritpion(mockForm);

    expect(mockHttpService.addProduct).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 100,
      discription: 'Test description',
    });

    expect(mockForm.resetForm).toHaveBeenCalled();
  });
});
