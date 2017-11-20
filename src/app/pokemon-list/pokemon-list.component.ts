import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  private pokemons = [];
  private previousPage = null;
  private nextPage = null;
  constructor(
    private pokemonService: PokemonService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getPokemonList();
  }

  private getPokemonList(offsetUrl=null){
    console.log("The offset url is ", offsetUrl);
    this.pokemonService.getPokemonList(offsetUrl).subscribe((pokemonResults:any)=>{
      if(pokemonResults.results){
        this.pokemons = pokemonResults.results;
        this.previousPage = pokemonResults.previous;
        this.nextPage = pokemonResults.next;
      }
    });
  }
  private getPokemonUrl(pokemonUrl:any): string{
    return this.pokemonService.getPokemonSpriteUrl(pokemonUrl);
  }

  private openPokemonDetail(pokemon: any){
    let pokemonId = this.pokemonService.getPokemonId(pokemon.url);
    this.router.navigate([`/pokemons/${pokemonId}`]);
  }

  private clearState(){
    this.pokemons = [];
    this.previousPage = null;
    this.nextPage = null;
  }
  private openPreviousPage(){
    if(this.previousPage){
      this.getPokemonList(this.previousPage);
      this.clearState();
    }
  }

  private openNextPage(){
    if(this.nextPage){
     this.getPokemonList(this.nextPage); 
     this.clearState();       
    }
  }
}
