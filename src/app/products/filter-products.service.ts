import { Injectable } from '@angular/core';
import { ProductRepositoryService } from './products-repository.service';

@Injectable ()
export class FilterProducts {
    constructor() {}

    filterProductsMarca(filter, products) {
        if (!filter) {
            return products;
        }

        if (filter === 'ALL') {
            // console.log(filter);
            return products;
        }
            // console.log('service: ');
            // const filtro = products.filter(dc => dc.category.startsWith(filter));
            // console.log(filtro);
            return products.filter(c => c.brand.startsWith(filter) || c.category.startsWith(filter));
    }

    filterProductsCateg(filter, products) {
        if (!filter) {
            return products;
        }
        if (filter === 'ALL') {
            return products;
        }
        return products.filter(dc => dc.category.startsWith(filter));
    }


}