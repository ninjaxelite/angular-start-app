import { Injectable } from '@angular/core';
import { Hero } from './hero';
import 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Injectable()
export class HeroService {
   private heroesUrl = '/api/heroes';  // URL to web api 
   private headers = new Headers({'Content-Type': 'application/json', 'dataType': 'json'});
   private heroes: Hero[];
   
   constructor(private http: Http) {
       this.heroes = [];
    }
    
   getHeroes(): Promise<Hero[]> {
     return this.http.get(this.heroesUrl)
                .map (t=>t.json())
                .toPromise()
                .then(response => response.map(i => new Hero(i.id_pk, i.heroname)))
                .catch(this.handleError);
   }

   getHero(id: number): Promise<Hero> {
     const url = `${this.heroesUrl}/hero/${id}`;
     return this.http.get(url)
                .map(t=>t.json())
                .toPromise()
                .then(response => new Hero(response.id_pk, response.heroname))
                .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/hero/update/${hero.id}`;
      return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero).catch(this.handleError);
    }

    createHero(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/hero/new`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
        .map(t=>t.json())
            .toPromise()
            .then(resp => new Hero(resp.id_pk, hero.name)).catch(this.handleError);
    }

    deleteHero(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/hero/delete`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
     console.error('An error occurred: ', error); // for demo purposes only
     return Promise.reject(error.message || error);
    }

}