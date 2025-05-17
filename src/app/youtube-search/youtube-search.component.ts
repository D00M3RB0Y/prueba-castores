import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Favorite } from '../interfaces/fav';
import { FavService } from '../services/fav.service';
import { Router } from '@angular/router';
import { ErrorsService } from '../services/errors.service';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeResponse {
  videos: YouTubeVideo[];
  nextPageToken: string;
  prevPageToken: string;
  totalResults: number;
  resultsPerPage: number;
}

interface YoutubeApiResponse {
  items: any[];
}

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatIconModule],
  templateUrl: './youtube-search.component.html',
  styleUrl: './youtube-search.component.css',
})
export class YoutubeSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: YouTubeVideo[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  private backendApiUrl = environment.apiUrl;
  private youtubeVideosEndpoint = 'api/youtube/videos';
  private favVideosEndpoint = 'api/playlist/favorites';
  
  currentPage: number = 1;
  totalResults: number = 0;
  resultsPerPage: number = 10;
  nextPageToken: string | null = null;
  prevPageToken: string | null = null;
  favoriteVideos: string[] = [];

  userid: string = '';
  videoId: string = '';
  createdAt: string = '';

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private _favService: FavService,
    private router: Router,
    private _errorService: ErrorsService
  ) {}

  ngOnInit(): void {
    
  }

  addToFavorites(video: YouTubeVideo) {
    const useridi = localStorage.getItem('id');
    if (!useridi) {
      this.toast.error('Usuario no identificado. Inicia sesión.');
      return;
    }
    const fav: Favorite = {
      userid: useridi,
      videoId: video.id,
      createdAt: new Date().toISOString(),
    };

    this._favService.saveFav(fav).subscribe({
      next: () => {
        this.toast.success(`Video ${video.title} añadido a favoritos.`);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e);
      },
      complete: () => console.log('complete'),
    });
  }

  

  goToNextPage() {
    if (this.nextPageToken) {
      this.searchVideosWithToken(this.nextPageToken);
    }
  }

  goToPreviousPage() {
    if (this.prevPageToken) {
      this.searchVideosWithToken(this.prevPageToken);
    }
  }

  searchVideos(newPage: string = '1') {
    this.loading = true;
    this.errorMessage = '';
    this.searchResults = [];
    this.currentPage = parseInt(newPage, 10);

    if (this.searchQuery.trim()) {
      const url = `${this.backendApiUrl}${this.youtubeVideosEndpoint}?query=${this.searchQuery}`; // Búsqueda inicial sin pageToken
      this.http.get<YouTubeResponse>(url).subscribe({
        next: (data) => {
          this.searchResults = data.videos;
          this.nextPageToken = data.nextPageToken || null;
          this.prevPageToken = data.prevPageToken || null;
          this.totalResults = data.totalResults || 0;
          this.resultsPerPage = data.resultsPerPage;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al buscar videos.';
          console.error('Error al obtener videos:', error);
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Por favor, ingresa un término de búsqueda.';
      this.loading = false;
    }
  }

  searchVideosWithToken(pageToken: string) {
    this.loading = true;
    this.errorMessage = '';
    this.searchResults = [];

    const url = `${this.backendApiUrl}${this.youtubeVideosEndpoint}?query=${this.searchQuery}&pageToken=${pageToken}`;
    this.http.get<YouTubeResponse>(url).subscribe({
      next: (data) => {
        this.searchResults = data.videos;
        this.nextPageToken = data.nextPageToken || null;
        this.prevPageToken = data.prevPageToken || null;
        this.totalResults = data.totalResults || 0;
        this.resultsPerPage = data.resultsPerPage;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al buscar videos.';
        console.error('Error al obtener videos:', error);
        this.loading = false;
      },
    });
  }

  
}

