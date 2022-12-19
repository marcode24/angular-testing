import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './product.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { mockProducts, mockProduct } from '../models/product.mock';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController; // This is a mock of the HttpClient service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService,
      ]
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = mockProducts(10);
      productService.getAllSimple().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products).toEqual(mockData);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products?limit=10&offset=0`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('getAll function', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = mockProducts(10);
      productService.getAllSimple().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products?limit=10&offset=0`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...mockProduct(),
          price: 100,
        },
        {
          ...mockProduct(),
          price: 200,
        },
        {
          ...mockProduct(),
          price: 0,
        },
        {
          ...mockProduct(),
          price: -100,
        }
      ];
      productService.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
        doneFn();
      });
      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const limit = 10;
      const offset = 3;
      const mockData: Product[] = mockProducts(limit);
      productService.getAll(limit, offset).subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });
      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
      req.flush(mockData);
    });
  });

  describe('create function', () => {
    it('should return a new product', (doneFn) => {
      const mockData: Product = mockProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['image1', 'image2'],
        description: 'new product description',
        categoryId: 1,
      };

      productService.create({...dto}).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(dto);
    });
  });

  describe('update function', () => {
    it('should return an updated product', (doneFn) => {
      const mockData: Product = mockProduct();
      const productId = '1';
      const dto: UpdateProductDTO = {
        title: 'new product updated',
      };

      productService.update(productId, {...dto}).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
    });
  });

  describe('delete function', () => {
    it('should delete a product', (doneFn) => {
      const mockData = true;
      const productId = '1';

      productService.delete(productId).subscribe((product) => {
        expect(product).toEqual(mockData);
        doneFn();
      });

      // replace production url with mock url
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });
});
