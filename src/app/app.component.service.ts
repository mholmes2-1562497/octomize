import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Hardware } from '../models/hardware'
import { Accelerate } from '../models/accelerate';
import { Benchmark } from '../models/benchmark';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }


  getHardware(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>('http://netheria.takehome.octoml.ai/hardware');
  }

//   setBenchmark(): Observable<Benchmark> {
//     return this.http.post<Benchmark>('http://netheria.takehome.octoml.ai/benchmark');
//   }
//
//   setAccelerate(): Observable<Accelerate> {
//     return this.http.post<Accelerate>('http://netheria.takehome.octoml.ai/accelerate');
//   }

}

