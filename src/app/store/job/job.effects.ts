// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { loadJobs, loadJobsSuccess } from './job.action';
// import { map, mergeMap } from 'rxjs/operators';
// import { JobService } from '../../services/job.service';

// @Injectable()
// export class JobEffects {
//   constructor(
//     private actions$: Actions,
//     private jobService: JobService
//   ) {
//     console.log('Actions:', this.actions$);
//     console.log('JobService:', this.jobService);
//   }

//   loadJobs$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadJobs),
//       mergeMap(({ parPage, page }) =>
//         this.jobService.getJobs(parPage, page).pipe(
//           map(data => loadJobsSuccess({ jobs: data.data }))
//       )
//     )
//     )
//   );

// }
