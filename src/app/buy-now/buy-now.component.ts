import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/model/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit{
  dataForm! : FormGroup;
  imageError! : string;

  constructor( private formBuilder : FormBuilder,
    private productService : ProductService){
   
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.dataForm = this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void{
    if(this.dataForm.invalid){
      return;
    }
    const product: Product = {
      name: this.dataForm.value.name,
      price: this.dataForm.value.price,
      image: this.dataForm.value.image
    };
    this.productService.addProducts(product);

    console.log(this.productService.getListForConsole());

    this.dataForm.reset();
    this.resetFile();
  }
  resetFile(): void{
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if(fileInput){
      fileInput.value= '';
    }
  }

  ImageUpload(event : Event): void{
    const inputElemnt = event.target as HTMLInputElement;
    if(inputElemnt && inputElemnt.files && inputElemnt.files.length > 0){
      const file = inputElemnt.files[0];
      if(file.size > 100 * 1024){
        this.imageError = 'Image size must be less than 100kb...';
      }else {
        this.imageError = '';

        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataURL = reader.result as string;
          this.dataForm.patchValue({ image: imageDataURL });
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
