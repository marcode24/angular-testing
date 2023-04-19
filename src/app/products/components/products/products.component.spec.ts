import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/services/product.service';
import { mockProducts } from 'src/app/models/product.mock';
import { mockObservable } from 'src/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    const productsMock = mockProducts(3);
    productService.getAll.and.returnValue(mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
