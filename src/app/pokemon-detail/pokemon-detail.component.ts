import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  private pokemonDetail = null;
  private abilityDetails = [];
  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
   ) { }

  ngOnInit() {
    this.getPokemonDetail();
  }

  private async getPokemonDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    let pokemonDetailResponse:any = await this.pokemonService.getPokemonDetail(id);
    if(pokemonDetailResponse != null && pokemonDetailResponse.name != null){
      this.pokemonDetail = pokemonDetailResponse;
      this.getPokemonAbilities();
    }else{
      console.log("Error in getting pokemon detail response");
    }
  }

  private getPokemonAbilities(){
    if(this.pokemonDetail){
      let abilities = this.pokemonDetail.abilities;
      abilities.forEach(async (abilityIn)=>{
        let ability = abilityIn.ability;
        let abilityDetail = await this.pokemonService.getPokemonAbility(ability.url);
        this.abilityDetails.push(abilityDetail);
      })
    }
  }

  private pickEffectEnglish(ability){
    let effectEntries = ability.effect_entries;
    let englishEntry = effectEntries.find((entry) => {
      if(entry.language && entry.language.name == "en"){
        return true;
      }
    })
    if(englishEntry != null){
      return englishEntry.short_effect;
    }else{
      return "Unknown Ability Effect";
    }
  }
}
