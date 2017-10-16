import { Injectable } from '@angular/core';
import { Hero } from './hero';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
   private heroesUrl = '/api/heroes';  // URL to web api 
   private headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http) { }
    
   getHeroes(): Promise<Hero[]> {
     let xx =  this.http.get(this.heroesUrl)
                .toPromise();
                console.info("asdf");
                return xx.then(response => response.json() as Hero[])
                .catch(this.handleError);
   }
    
   private handleError(error: any): Promise<any> {
     console.error('An error occurred: ', error); // for demo purposes only
     return Promise.reject(error.message || error);
   }

   getHero(id: number): Promise<Hero> {
     const url = `${this.heroesUrl}/hero/${id}`;
     let h = this.http.get(url)
                .toPromise()
                .then(response => response.json() as Hero)
                .catch(this.handleError);
                
                return h;
    }

    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/hero/update/${hero.id}`;
      console.info('update url: '+url);
      return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero).catch(this.handleError);
    }
}