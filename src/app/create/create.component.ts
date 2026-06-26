import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BlogService } from 'src/services/BlogService';
import { BlogItem } from '../shared/types/productItem';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  product = new FormGroup({
    name : new FormControl('', Validators.required),
    price : new FormControl('', Validators.required),
  });
  constructor(private blogService: BlogService, private router: Router) {}
  get name(){
    return this.product.get('name')
  }
  get price(){
    return this.product.get('price')
  }
  handleAddCart() {
    if(this.name?.hasError('required') || this.price?.hasError('required')) return; 
    // console.log(this.name?.value);
    // console.log(this.price?.value)
    const blogItem: BlogItem = {
      id: Math.random(), 
      title: String(this.name?.value), 
      body: String(this.price?.value), 
      author: 'mario'
    }
    this.blogService.postBlog(blogItem).subscribe(({data}:any)=> 
    {
      if(data.id){
        this.router.navigate(['/']);
      }
    })
  }
}
