import { Store } from '@ngrx/store';
import { JobService } from './../../services/job.service';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { loadJobsAction } from '../../store/job/job.action';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage:number = 1
  pageSize:number = 12
  @Output() selectedNumber:EventEmitter<number> = new EventEmitter<number>()
  constructor(private JobService: JobService,private Store:Store<{job:any}>) { }
  changePage(pageNum:number){
    console.log("page", pageNum);
    this.currentPage = pageNum;
    this.JobService.getJobs(this.currentPage, this.pageSize).subscribe(jobs => {
      console.log("pagination", jobs);
      this.Store.dispatch(loadJobsAction({data:jobs.data}))
    })
    this.selectedNumber.emit(this.currentPage);
  }
  nextPage(){
    this.currentPage+=1;
    this.JobService.getJobs(this.currentPage, this.pageSize).subscribe(jobs => {
      console.log("pagination", jobs);
      this.Store.dispatch(loadJobsAction({data:jobs.data}))
    })
    this.selectedNumber.emit(this.currentPage)
  }
  previousPage (){
    this.currentPage-=1
    this.JobService.getJobs(this.currentPage, this.pageSize).subscribe(jobs => {
      console.log("pagination", jobs);
      this.Store.dispatch(loadJobsAction({data:jobs.data}))
    })
    this.selectedNumber.emit(this.currentPage)
  }
}
