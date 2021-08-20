
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
  
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`);
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/game/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/game/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/game/${id}/screenshots`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
  }