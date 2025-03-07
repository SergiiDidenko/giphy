import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GifDetailsDTO, GiphyDTO } from '../dtos/dto';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiUrl: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  searchGifs(
    query: string,
    limit: number,
    offset: number
  ): Observable<GiphyDTO> {
    return this.http.get<GiphyDTO>(`${this.apiUrl}/v1/gifs/search`, {
      params: new HttpParams()
        .set('q', query)
        .set('api_key', this.apiKey)
        .set('limit', limit)
        .set('offset', offset),
    });
  }

  getTrendingGifs(limit: number, offset: number): Observable<GiphyDTO> {
    return this.http.get<GiphyDTO>(`${this.apiUrl}/v1/gifs/trending`, {
      params: new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', limit)
        .set('offset', offset),
    });
  }

  getGifById(id: string): Observable<GifDetailsDTO> {
    return this.http.get<GifDetailsDTO>(`${this.apiUrl}/v1/gifs/${id}`, {
      params: new HttpParams().set('api_key', this.apiKey),
    });
  }
}
