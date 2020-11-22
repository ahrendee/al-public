import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const increment10 = createAction('[Counter Component] Increment by 10');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
