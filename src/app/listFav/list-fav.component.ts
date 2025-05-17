import { Component } from '@angular/core';
import { YoutubeFavsComponent } from '../youtube-favs/youtube-favs.component';
import { NavbarComponent } from '../navbar/navbar.component'

@Component({
  selector: 'app-list-fav',
  imports: [YoutubeFavsComponent, NavbarComponent],
  templateUrl: './list-fav.component.html',
  styleUrl: './list-fav.component.css'
})
export class ListFavComponent {

}
