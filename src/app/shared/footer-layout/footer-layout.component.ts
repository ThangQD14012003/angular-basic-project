import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'footer-layout', 
    standalone: true, 
    templateUrl: './footer-layout.component.html',
    styleUrls: ['./footer-layout.component.css'], 
    imports: [
        RouterLink
    ]
})
export class FooterLayoutComponent {

}