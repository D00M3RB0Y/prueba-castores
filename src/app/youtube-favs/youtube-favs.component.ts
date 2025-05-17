import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Favorite } from '../interfaces/fav';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorsService } from '../services/errors.service';
import { FavService } from '../services/fav.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-youtube-favs',
  imports: [CommonModule, MatIconModule],
  templateUrl: './youtube-favs.component.html',
  styleUrl: './youtube-favs.component.css',
})
export class YoutubeFavsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private _favService: FavService,
    private router: Router,
    private _errorService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }
  favoriteList: Favorite[] = [];
  favoriteVideosDetails: any[] = []; // Detalles completos de videos desde YouTube

  loadFavorites() {
    const userId = localStorage.getItem('id') || '';
    this._favService.getFavoritesByUser(userId).subscribe((favs) => {
      this.favoriteList = favs;

      const videoIds = favs.map((fav) => fav.videoId);

      this._favService.getVideoDetails(videoIds).subscribe((videoDetails) => {
        this.favoriteVideosDetails = videoDetails;
      });
    });
  }

  removeFromFavorites(videoId: string): void {
    const userid = localStorage.getItem('id'); // Asegúrate de tener esto almacenado

    if (!userid) {
      console.error('No hay usuario logueado');
      return;
    }

    this._favService.deleteFavorite(userid, videoId).subscribe({
      next: () => {
        this.toast.success('Favorito eliminado');
        this.loadFavorites(); // Vuelve a cargar la lista
      },
      error: (err) => {
        console.error('Error al eliminar favorito', err);
      },
    });
  }
}
