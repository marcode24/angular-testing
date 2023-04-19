import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, asyncData, getText, mockObservable } from 'src/testing';
import { ProductsService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { generateOneUser } from 'src/app/models/user.mock';
import { mockProduct } from 'src/app/models/product.mock';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: Location, useValue: locationSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...mockProduct(),
      id: productId
    };
    productService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges(); // here's called ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...mockProduct(),
      id: productId
    };
    productService.getOne.and.returnValue(mockObservable(productMock));
    fixture.detectChanges();
    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');
    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(productMock.price);
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back without id params', () => {
    route.setParamMap({});
    location.back.and.callThrough(); // mocking

    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });

  it('should change the status "loading" => "success"', fakeAsync(() => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...mockProduct(),
      id: productId
    };

    productService.getOne.and.returnValue(asyncData(productMock));

    fixture.detectChanges();

    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();

    expect(component.status).toEqual('success');
  }));
});
