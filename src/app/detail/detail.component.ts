import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductItems } from '../shared/types/productItem';
import { BlogService } from 'src/services/BlogService';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id = ''; 
  constructor(private route: ActivatedRoute, private blogService:BlogService){
    this.id = String(route.snapshot.paramMap.get('id')); 
    console.log("id in constructor ", this.id)
  }
  productItem: ProductItems = {
    id: 0, 
    image: '', 
    name: '', 
    price: 0
  }
  ngOnInit(): void {
    this.blogService.detailBlog(Number(this.id)).subscribe(({data}:any) => {
      console.log("data: ",data); 
      this.productItem.id = data.id,
      this.productItem.image = '../assets/images/lego1.jpg', 
      this.productItem.name = data.title, 
      this.productItem.price = data.body
    })
  }
}
