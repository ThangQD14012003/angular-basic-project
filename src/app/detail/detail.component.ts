import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductItems } from '../shared/types/productItem';
import { BlogService } from 'src/services/BlogService';
import { currencyPipe } from '../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterOutlet,
    currencyPipe
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  idd = ''; 
  constructor(private route: ActivatedRoute, private blogService:BlogService){
    this.idd = String(route.snapshot.paramMap.get('idd')); 
    console.log("id in constructor ", this.idd)
  }
  productItem: ProductItems = {
    id: 0, 
    image: '', 
    name: '', 
    price: 0, 
    description: ''
  }
  ngOnInit(): void {
    this.blogService.detailBlog(Number(this.idd)).subscribe((data:any) => {
      console.log("data11: ",data); 
      this.productItem = data
      this.productItem.image = '../assets/images/lego1.jpg'
      this.productItem.description = 'Đây là bộ LEGO phiên bản đặc biệt với thiết kế hiện đại, nhiều chi tiết đẹp mắt và chất liệu cao cấp. Phù hợp cho cả trẻ em và người sưu tầm LEGO.'
    })
  }
}
