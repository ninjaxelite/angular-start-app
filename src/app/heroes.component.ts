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