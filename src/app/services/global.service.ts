import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// interface IJobDetails  {
//   job:object,
//    :boolean,
//   isUserSaved:boolean,

// }
export class GlobalService {
  reqCount = 0;
  applyAndSaveJobs : BehaviorSubject<any> = new BehaviorSubject([]);
  applyAndSaveJobs$ = this.applyAndSaveJobs.asObservable();
  jobDetails:BehaviorSubject<any>  = new BehaviorSubject({});
  jobDetails$ = this.jobDetails.asObservable();
  isLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLogin$ = this.isLogin.asObservable();
  constructor(private spinnerService: NgxSpinnerService) {
   }
  showSpinner() {
    this.reqCount++;
    this.spinnerService
    this.spinnerService.show(undefined,{
      type: 'ball-scale-multiple',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size:"large"
    });
  }

  hideSpinner() {
    this.reqCount--;
    if (this.reqCount == 0) {
      this.reqCount = 0;
      this.spinnerService.hide();
    }
  }
}
