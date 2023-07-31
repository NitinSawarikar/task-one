import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/model/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  productList : Product[] = [];
  bag : Product[] =[]

  constructor(private productServ : ProductService){ }

  ngOnInit(): void {
    this.productList = this.productServ.getProducts();
  }

  addToBag(product : Product): void{
    const productBag = this.bag.find(p => p.name === product.name);

    if(productBag){
      productBag.quantity = (productBag.quantity || 0) + (product.quantity || 0);
    }else{
      const productAdd : Product = {...product, quantity: product.quantity};
      this.bag.push(productAdd)
    }
  }

  total(): number {
    let fullTotal = 0;
    for(const product of this.bag){
      const amount =(product.price || 0) * (product.quantity || 0)
      fullTotal += amount;
    }
    return fullTotal;
  }
}
