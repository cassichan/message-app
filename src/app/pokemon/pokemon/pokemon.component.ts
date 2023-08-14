import { Component, inject } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  private pokemonService = inject(PokemonService);
  pokemonData$ = this.pokemonService.fromPokeApi$;

  //Angular handles unsubscribing automatically when observable in the template
}
