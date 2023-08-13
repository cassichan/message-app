import { Component, inject } from '@angular/core';
import { forkJoin, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
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
}
