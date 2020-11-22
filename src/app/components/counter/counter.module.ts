import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromCounter.featureKey, fromCounter.reducer)
  ],
})
export class CounterModule {
}
