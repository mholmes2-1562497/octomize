import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Hardware } from '../models/hardware'

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://netheria.takehome.octoml.ai/hardware';

  getHardware(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>('http://netheria.takehome.octoml.ai/hardware');
  }

}

