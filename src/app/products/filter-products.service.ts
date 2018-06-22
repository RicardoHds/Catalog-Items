import { Injectable } from '@angular/core';
import { ProductRepositoryService } from './products-repository.service';

@Injectable ()
export class FilterProducts {
    constructor() {}

    filterProducts(filter, products) {
        if (!filter) {
            return products;
        }

        if (filter === 'ALL') {
            return products;
        }
            return products.filter(c => c.USO.startsWith(filter) || c.CAPACIDAD.startsWith(filter) || c.COMBUSTIBLE.startsWith(filter));
    }

    /*filterProductsCateg(filter, products) {
        if (!filter) {
            return products;
        }
        if (filter === 'ALL') {
            return products;
        }
        return products.filter(dc => dc.category.startsWith(filter));
    }*/


}
