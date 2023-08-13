import { Component, inject } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  mergeMap,
  of,
  Subject,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'message-app';
  name = 'Angular';
  numberArray$ = of([1, 2, 3, 4, 5]);
  valueSubject$ = new Subject<string>();

  http = inject(HttpClient);
  fromPokeApi$ = this.http
    .get<{
      count: number;
      next: string;
      previous: string | null;
      results: { name: string; url: string }[];
    }>(' https://pokeapi.co/api/v2/pokemon?limit=1')
    .pipe(
      mergeMap((mainResponse) => {
        // Get the url property from each item in the results array from the main response. Creates an observable
        const urlRequests = mainResponse.results.map((item) =>
          this.http.get(item.url)
        );
        //Executes the observable
        return forkJoin(urlRequests).pipe(
          mergeMap((detailsResponses) => {
            // Combine the results from the main response with the details for each item in the results array
            const combinedResults = mainResponse.results.map(
              (result, index) => {
                return {
                  ...result,
                  details: detailsResponses[index],
                };
              }
            );
             // Combine the main response with the updated results (detailed data for each pokemon)
            return [{ ...mainResponse, results: combinedResults }];
          })
        );
      })
    );

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
