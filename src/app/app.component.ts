import { Component } from '@angular/core';
import { distinctUntilChanged, filter, map, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'message-app';
  valueSubject$ = new Subject<string>();

  constructor() {
    this.valueSubject$
      .asObservable()
      .pipe(
        // for side effects
        tap((val) => console.log('val from tap ' + val)),
        // allowed condition passes
        filter((val) => val !== ''),
        // do not repeat value
        distinctUntilChanged(),
        // transforms value as specified
        map((val) => val.toUpperCase())
      )
      .subscribe(console.log);
  }

  //Example of how you could execute logic without observables/pipes
  valueSubjectAsFunction(val: string) {
    // tap for side effects
    console.log(val);
    // filter
    if (val === '') return;
    //... so on
  }
}
