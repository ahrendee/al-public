import { createReducer, on } from '@ngrx/store';
import { decrement, increment, increment10, reset } from './counter.actions';

export const featureKey = 'counter';

const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(increment10, state => state + 10),
  on(decrement, state => state - 1),
  on(reset, state => 0),
);

export function reducer(state, action) {
  return _counterReducer(state, action);
}
