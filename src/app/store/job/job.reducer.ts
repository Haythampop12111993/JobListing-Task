import { loadJobsAction } from './job.action';
// // import { JobService } from './../../services/job.service';
// // import { createReducer, on } from "@ngrx/store";
// // import { loadJobs } from "./job.action";
// // import { inject } from '@angular/core';
// // import { createEffect, ofType, Actions } from '@ngrx/effects';
// // import { map, mergeMap } from 'rxjs/operators';

import { createReducer, on } from "@ngrx/store";

// // let jobList: any = [];

// // function injectJobService() {
// //   let jobService = inject(JobService);
// //   return jobService
// // }
// // export const jobReducer = createReducer(
// //   jobList,
// //   on(loadJobs, (state, { parPage, page }) => {
// //     injectJobService().getJobs(parPage, page).subscribe(data => {
// //       state = data.data;
// //     });
// //     // return state;
// //   })
// // );
// // ////////////////////////////////////////////////
// // // export class JobReducer {
// // //   constructor(private jobService: JobService) { }

// // //   static jobReducer = createReducer(jobList,on(loadJobs,(state,{parPage,page})=>{this.jobService.getJobs(parPage,page).subscribe(data=>{return data.data});}));
// // // }
// // // export class JobEffects {
// // //   jobEffects = createEffect(() => {
// // //     let actions$ = inject(Actions);
// // //     const jobService = inject(JobService);
// // //     return actions$.pipe(
// // //       ofType(loadJobs),
// // //       mergeMap(({ parPage, page }) =>
// // //         jobService.getJobs(parPage, page).pipe(
// // //           map(jobs => ({ type: '[Job API] Jobs Loaded Success', payload: jobs.data }))
// // //         )
// // //       )
// // //     );
// // //   });

// // // }

// import { createReducer, on } from '@ngrx/store';
// import { loadJobsSuccess, loadJobsAction } from './job.action';

// export const initialState: any[] = [];

// export const jobReducer = createReducer(
//   initialState,
//   on(loadJobsSuccess, (state, { jobs }) => [...jobs])
// );
const initialState:any = []
export const jobsReducer = createReducer(initialState,on(loadJobsAction,(state,action)=>action.data))
