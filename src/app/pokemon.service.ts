import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
@Injectable()
export class PokemonService {
  private pokemonUrl:string = "https://pokeapi.co/api/v2/pokemon/";
  private pokemonMatchRegx = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)\//;
  private pokemonImagePrefix:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  constructor(
    private http: HttpClient
  ) {}
  public getPokemonList(offsetUrl){
    if(offsetUrl == null){
      offsetUrl = this.pokemonUrl;
    }
    return this.http.get(offsetUrl)
      .pipe(
        tap(_ => console.log(`Fetched pokemon list`)), 
        catchError(this.handleError('getPokemonList: Error in fetching Pokemon List', []))
        );
  }
  public getPokemonSpriteUrl(pokemonUrl:string):string{
    let regexMatch = pokemonUrl.match(this.pokemonMatchRegx);
    if(regexMatch.length >= 1){
      return `${this.pokemonImagePrefix}${regexMatch[1]}.png`;
    }else{
      return "unknown";
    }
  }
  public getPokemonId(pokemonUrl: string): string{
    let regexMatch = pokemonUrl.match(this.pokemonMatchRegx);
    if(regexMatch.length >= 1){
      return regexMatch[1];
    }
    return null;
  }
  public getPokemonDetail(pokemonId){
    return this.http.get(`${this.pokemonUrl}${pokemonId}`)
      .pipe(
        tap(_ => console.log(`Fetched pokemon detail ${pokemonId}`)), 
        catchError(this.handleError(`getPokemonDetail: Error in fetching ${pokemonId}`, []))
        ).toPromise();
  }
  public getPokemonAbility(abilityUrl){
    return this.http.get(abilityUrl)
      .pipe(
        tap(_ => console.log(`Fetched pokemon ability ${abilityUrl}`)), 
        catchError(this.handleError(`getPokemonAbility: Error in fetching ${abilityUrl}`, []))
        ).toPromise();
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation);
      console.error(error); // log to console instead
      return of(result as T);
  };
}
}
