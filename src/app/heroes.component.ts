import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
    styleUrls: ['./css/heroes.component.css']
})

export class HeroesComponent implements OnInit{ 
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  onselect(hero: Hero): void {
    this.selectedHero = hero;
  }

  addHero(name: string): void {
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.createHero(new Hero(0,name))
      .then(hero => { 
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delHero(hero: Hero): void {
    if(this.heroes.length == 0){
      return;
    }
    this.heroService.deleteHero(hero)
      .then(() => {
        this.heroes.splice(this.heroes.indexOf(hero), 1);
        this.selectedHero = null
      });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() : void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}