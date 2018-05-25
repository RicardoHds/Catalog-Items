import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../products/products-repository.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
    marcas: any[];

    constructor(
        private productRepository: ProductRepositoryService
    ) { }

    ngOnInit() {
        this.productRepository.getMarcas()
        .subscribe(marcas => {
            this.marcas = marcas;
        });
    }

}
