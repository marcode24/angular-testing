import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { mockProducts } from 'src/app/models/product.mock';
import { defer, of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    const productsMock = mockProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPreviousProducts = component.products.length;
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.products.length).toEqual(productsMock.length + countPreviousProducts);
    });

    it('should change status "loading" to success', fakeAsync(() => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); // wait for async operation
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change status "loading" to error', fakeAsync(() => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.reject(productsMock)));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // wait for async operation (3 seconds) and then change status to error
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });


});
