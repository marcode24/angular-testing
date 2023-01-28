import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { mockProducts } from 'src/app/models/product.mock';
import { ValueService } from 'src/app/services/value.service';

import { asyncData, asyncError, getText, mockObservable, mockPromise, query, queryById } from 'src/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const spyValueService = jasmine.createSpyObj('ValueService', ['getPromiseValue']);
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: spy },
        { provide: ValueService, useValue: spyValueService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = mockProducts(3);
    productService.getAll.and.returnValue(mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(mockObservable(productsMock));
      const countPreviousProducts = component.products.length;
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.products.length).toEqual(productsMock.length + countPreviousProducts);
    });

    it('should change status "loading" to success', fakeAsync(() => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(asyncData(productsMock));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); // wait for async operation
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change status "loading" to error', fakeAsync(() => {
      const productsMock = mockProducts(10);
      productService.getAll.and.returnValue(asyncError('error'));
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // wait for async operation (3 seconds) and then change status to error
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise', () => {
    it('should call valueService.getPromiseValue', async () => {
      const mockMessage = 'test';
      valueService.getPromiseValue.and.returnValue(mockPromise('test'));
      await component.callPromise();
      fixture.detectChanges();
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(component.rta).toEqual(mockMessage);
    });

    it('should show "test" when button is clicked', fakeAsync (() => {
      const mockMessage = 'test';
      valueService.getPromiseValue.and.returnValue(mockPromise(mockMessage));
      // const buttonDebug = fixture.debugElement.query(By.css('.button-promise'));
      // const buttonDebug = query(fixture, '[data-test="button-promise"]');
      const buttonDebug = queryById(fixture, 'button-promise');
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      // const pDebug = fixture.debugElement.query(By.css('p.rta'));
      // const pDebug = query(fixture, 'p.rta');
      const textRta = getText(fixture, 'rta');
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(component.rta).toEqual(mockMessage);
      expect(textRta).toEqual(mockMessage);
      // expect(pDebug.nativeElement.textContent).toEqual(mockMessage);
    }));
  });
});
