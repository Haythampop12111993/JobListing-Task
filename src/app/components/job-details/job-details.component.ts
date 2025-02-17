import { Router, RouterLink } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-job-details',
  imports: [RouterLink,NgClass],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetailsData:{jobDetails:any,isUserApplied:boolean,isSaved:boolean}
  allSaveArray:any = []
  constructor(private GlobalService:GlobalService,private Router:Router,private toastr: ToastrService){
    this.jobDetailsData = {jobDetails:{},isUserApplied:false,isSaved:false}
   }
   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GlobalService.jobDetails$.subscribe(jobDetails => {this.jobDetailsData = jobDetails})
    console.log(this.jobDetailsData)
    if(!this.jobDetailsData.jobDetails){
      this.Router.navigate(["/home"])
    }
    this.GlobalService.applyAndSaveJobs$.subscribe(data => {this.allSaveArray = data})
    let isFound = this.allSaveArray.find((job:any) => job.id == this.jobDetailsData.jobDetails.id)
    if(isFound){
      let foundIndex = this.allSaveArray.findIndex((job:any) => job.id == this.jobDetailsData.jobDetails.id)
      this.jobDetailsData.isSaved = this.allSaveArray[foundIndex].isSaved
      this.jobDetailsData.isUserApplied = this.allSaveArray[foundIndex].isUserApplied
      if(this.jobDetailsData.isSaved){
        this.toastr.info("This job is already saved");
      }
      if(this.jobDetailsData.isUserApplied){
        this.toastr.info("This job is already applied");
      }
    }
   }
   applyJob(){
    let isUserLogin = localStorage.getItem("userLoginToken")
    if(isUserLogin){
      this.jobDetailsData.isUserApplied = true
    this.toastr.success('Job Applied Successfully');
    this.checkData("apply")
    }else{
      this.Router.navigate(["/login"])
      this.toastr.info("Please login first");
    }
   }
   saveJob(){
    let isUserLogin = localStorage.getItem("userLoginToken")
    if(!isUserLogin){
      this.Router.navigate(["/login"])
      this.toastr.info("Please login first");
      return

    }
    this.jobDetailsData.isSaved = true
    this.toastr.success("Job Saved Successfully");
    this.checkData("save")

   }
   checkData(val:string){
    let allSaveAndApplyJobs:any = []
    this.GlobalService.applyAndSaveJobs$.subscribe(data => {allSaveAndApplyJobs = data})
    let isFound = allSaveAndApplyJobs.find((job:any) => job.id == this.jobDetailsData.jobDetails.id)
    if(isFound){
      if(val == "apply"){
        let foundIndex = allSaveAndApplyJobs.findIndex((job:any) => job.id == this.jobDetailsData.jobDetails.id)
        allSaveAndApplyJobs[foundIndex].isUserApplied = true
        this.GlobalService.applyAndSaveJobs.next(allSaveAndApplyJobs)
        console.log(allSaveAndApplyJobs)

      }else if(val == "save"){
        let foundIndex = allSaveAndApplyJobs.findIndex((job:any) => job.id == this.jobDetailsData.jobDetails.id)
        allSaveAndApplyJobs[foundIndex].isSaved = true
        this.GlobalService.applyAndSaveJobs.next(allSaveAndApplyJobs)
        console.log(allSaveAndApplyJobs)

      }
    }else{
      if(val == "apply"){
        let newAddApplyJob = {id:this.jobDetailsData.jobDetails.id,isUserApplied:true,isSaved:false}
        this.GlobalService.applyAndSaveJobs.next([...allSaveAndApplyJobs,newAddApplyJob])
        console.log(allSaveAndApplyJobs)
      }
      else if(val == "save"){
        let newAddSaveJob = {id:this.jobDetailsData.jobDetails.id,isUserApplied:false,isSaved:true}
        this.GlobalService.applyAndSaveJobs.next([...allSaveAndApplyJobs,newAddSaveJob])
        console.log(allSaveAndApplyJobs)
      }
    }
   }
}
