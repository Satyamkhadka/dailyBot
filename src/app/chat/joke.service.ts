import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  replies: any;
  readonly ROOT_URL = 'http://api.icndb.com/jokes/random?firstName=Satyam&lastName=Khadka';

  constructor(private http: HttpClient) { }

  getJoke(): any {
    return this.http.get(this.ROOT_URL);
  }

}
