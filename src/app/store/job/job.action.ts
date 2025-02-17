import { createAction, props } from '@ngrx/store';
// // import { createAction, props } from "@ngrx/store";

// // export const loadJobs = createAction(
// //   "Load Jobs",
// //   props<{ parPage: number; page: number }>()
// // );


// // // const validateInputs = (parPage: number, page: number): boolean => {
// // //   return parPage > 0 && page > 0;
// // // };

// // // export const loadJobsAction = (parPage: number, page: number) => {
// // //   if (validateInputs(parPage, page)) {
// // //     return loadJobs({ parPage, page });
// // //   } else {
// // //     throw new Error("Invalid input: parPage and page must be greater than 0");
// // //   }
// // // };
// import { createAction, props } from '@ngrx/store';

// export const loadJobs = createAction(
//   '[Job] Load Jobs',
//   props<{ parPage: number, page: number }>()
// );

// export const loadJobsSuccess = createAction(
//   '[Job] Load Jobs Success',
//   props<{ jobs: any[] }>()
// );
/////////////////////////////////////////////////////////
export const loadJobsAction = createAction("loadJobs", props<{ data: any }>());
