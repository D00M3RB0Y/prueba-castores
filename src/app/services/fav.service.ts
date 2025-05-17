import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Favorite } from '../interfaces/fav';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  private AppUrl: string;
  private ApiUrl: string;
  private youtubeKey= 'AIzaSyCD4Y6sFJwNGhepu0gsJPCh1m-albE8Ldc';  
 private youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3/videos';
  
  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl;
    this.ApiUrl = 'api/playlist';
  }

  getFavoritesByUser(userid: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(
      `${this.AppUrl}${this.ApiUrl}/favorites/${userid}`
    );
  }

 deleteFavorite(userid: string, videoId: string) {
    return this.http.delete(`${this.AppUrl}${this.ApiUrl}/favorites/${userid}/${videoId}`);
  }

  saveFav(fav: Favorite): Observable<any> {
    return this.http.post(`${this.AppUrl}${this.ApiUrl}/favorites`, fav);
  }

  getVideoDetails(videoIds: string[]) {
    const ids = videoIds.join(',');
    const url = `${this.youtubeApiBaseUrl}?part=snippet,contentDetails,statistics&id=${ids}&key=${this.youtubeKey}`;

    // Define el tipo explícito para 'res' aquí
    return this.http.get<{ items: any[] }>(url).pipe(
      map((res: { items: any[] }) => res.items)
    );
  }
}
