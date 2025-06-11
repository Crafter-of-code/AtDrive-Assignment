import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
type data_recived = {
  data: {
    data: {
      time: string;
      values: {
        temperature: number;
        humidity: number;
        windSpeed: number;
        pressureSurfaceLevel: number;
      };
    };

    location: {
      name: string;
    };
  };
};
@Component({
  selector: 'app-weather-container',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-container.component.html',
  styleUrl: './weather-container.component.css',
})
export class WeatherContainerComponent implements OnInit {
  area_of_weather: string = '';
  temperature: number = 0;
  condition: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  pressure: number = 0;
  location: string = 'Delhi';

  constructor(private weather: HttpClient) {}
  ngOnInit(): void {}

  OnSubmit(weatherForm: NgForm) {
    if (weatherForm.value.area == '') {
      console.log('empty');
    } else {
      this.weather
        .get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${weatherForm.value.area}&apikey=Y0S2O1N9UqRKRTUjsDkS2AzvpMgvflnB`
        )
        .subscribe({
          next: (data: data_recived | any) => {
            this.location = data.location.name;
            this.temperature = data.data.values.temperature;
            this.humidity = data.data.values.humidity;
            this.windSpeed = data.data.values.windSpeed;
            this.pressure = data.data.values.pressureSurfaceLevel;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
