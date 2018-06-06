import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './products';
import { ProductRepositoryService } from './products-repository.service';

@Component({
    selector: 'app-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: []
})

export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Detalle del Producto';
    errorMessage: string;
    product: IProduct;
    param: number;


    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductRepositoryService) {
    }

    ngOnInit() {
        const param = this._route.snapshot.params.id;
        if (param) {
            const id = +param;
            this.getProduct(id);
        }
    }

    getProduct(id: number) {
        this._productService.getProduct(id).subscribe(
        product => this.product = product,
        error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/productos']);
    }


}
