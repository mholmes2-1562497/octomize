import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://netheria.takehome.octoml.ai/hardware';

  getConfig() {
//     return this.http.get<Config>(this.configUrl);
  }
}

