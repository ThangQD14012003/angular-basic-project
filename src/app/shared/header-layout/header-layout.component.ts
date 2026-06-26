import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'header-layout', 
    standalone: true, 
    templateUrl: './header-layout.component.html',
    styleUrls: ['./header-layout.component.css'], 
    imports: [
        RouterLink
    ]
})
export class HeaderLayoutComponent {

}