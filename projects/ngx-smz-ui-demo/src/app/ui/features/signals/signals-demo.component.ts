import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { signal } from './api/signal';
import { computed } from './api/computed';
import { effect } from './api/effect';
import { Store } from '@ngxs/store';
import { ToastActions } from 'ngx-smz-ui';

effect(() => {
  console.log('from voidddd');
});

@Component({
  selector: 'app-signals-demo',
  templateUrl: './signals-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalsDemoComponent implements OnInit {
  count = signal(0);
  double = computed(() => this.count() * 2);
  countType = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));
  constructor(private store: Store) {
    // effect(() => {
    //   console.log('effect');
    //   console.log('Count changed', this.count());
    //   // console.log(this.count(), 'is', this.countType());
    //   this.store.dispatch(new ToastActions.Info('Count changed'));
    // });
  }

  ngOnInit(): void {

  }

  inc() {
    this.count.update((c) => c + 1);
  }

  reset() {
    this.count.set(0);
  }

}
