import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = 'https://api-next.jobsglobal.com:54902/api/v1/jobs/all?pagination_type=paginate';
  constructor(private http:HttpClient) { }
  getJobs(page:number,parPage:number):Observable<any>{
    return this.http.get(`${this.baseUrl}&page=${page}&per_page=${parPage}`);
  }
}
