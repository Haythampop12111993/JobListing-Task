import { GlobalService } from './../../services/global.service';
import { JobService } from './../../services/job.service';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadJobsAction } from '../../store/job/job.action';
// import { loadJobs } from '../../store/job/job.action';
import {  NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgClass } from '@angular/common';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { PaginationComponent } from "../pagination/pagination.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NgxSpinnerModule, NgClass, CustomDatePipe, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jobs:any = [];
  isLoading = false;
  currentPage :number= 1;
  parPage:number = 12;
  moreInPage : number = 24;
  isShowMore : boolean = false;
  constructor(private store : Store<{job:any}>,private JobService:JobService,private spinner:NgxSpinnerService,private GlobalService:GlobalService,private Router:Router) {
    this.JobService.getJobs(this.currentPage,this.parPage).subscribe({
      next: (data) => {
        this.store.dispatch(loadJobsAction({data: data.data}))
        this.isLoading = true;
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.store.dispatch(loadJobs({parPage:10,page:1}));
    // this.store.select('job').subscribe(data => {
    //   this.jobs = data;

    // })
    // console.log(this.jobs);

    this.store.select('job').subscribe({
      next: (data) => {
        this.jobs = data

      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        console.log("completed")
      }
    })
  }
  openJobDetails(job: any) {
    console.log(job);
    this.GlobalService.jobDetails.next({jobDetails:job,isUserApplied:false,isSaved:false})
    this.Router.navigate(["/jobDetails"])
  }
  loadMoreOrLess(){
    if(this.isShowMore == false){
      this.JobService.getJobs(this.currentPage,this.moreInPage).subscribe({
        next: (data) => {
          this.store.dispatch(loadJobsAction({data: data.data}))
          this.isLoading = true;
        }
      })
      this.isLoading = false;

      this.isShowMore = true
    }else{
      this.JobService.getJobs(this.currentPage,this.parPage).subscribe({
        next: (data) => {console.log(data.data)
          this.store.dispatch(loadJobsAction({data: data.data}))
          this.isLoading = true;
        }
      })
      this.isLoading = false;

      this.isShowMore = false
    }
    }
    getNumberFromChild(event:number){
      console.log(event);
      this.currentPage = event;
      if(this.currentPage !=1){
        this.isLoading = true;
        this.isShowMore = false;
      }
    }
}
