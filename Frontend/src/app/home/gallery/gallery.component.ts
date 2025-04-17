import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
 constructor(private router : Router){}
 gotoContactUs(){
  this.router.navigate(['/contact-us'])
 }
}
