import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirestoreService } from '../_service/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temperature; summary; timezone;
  linkData = [];
  toDoData = [];
  constructor(private httpClient: HttpClient, private fireService: FirestoreService) {
    this.getWeatherData();
    this.getLinks();
    this.getToDo();

  }

  ngOnInit() {
  }



  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  getWeatherData() {

    this.getPosition().then(pos => {
      const long = pos.lng;
      const lat = pos.lat;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      const data = this.httpClient.get(api);
      data.subscribe(weatherData => {
        this.summary = weatherData['summary'];
        this.timezone = weatherData['timezone'];
        weatherData = weatherData['currently'];
        this.temperature = weatherData['temperature'];
        this.temperature = Math.round((this.temperature - 32) / 1.8).toFixed(2);
        console.log(weatherData);
      });
    });
  }

  getLinks() {
    this.fireService.getDashLink().then(data => {
      this.linkData = [];
      this.linkData = data.docs.map(el => {
        return el.data();
      });
    });
  }
  getToDo() {
    this.fireService.getDashTodo().then(data => {
      this.toDoData = [];
      this.toDoData = data.docs.map(el => {
        return el.data();
      });
    });
  }
}
