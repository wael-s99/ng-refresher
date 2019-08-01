import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
  personschanged = new Subject<string[]>();
   persons: string[] = [];

constructor(private http: HttpClient) {}

// method
fetchPersons() {
  this.http.get<any>('https://swapi.co/api/people')
  .pipe(map(resData => {
    return resData.results.map(character => character.name);
  })
)
  .subscribe(transformedData => {
    this.personschanged.next(transformedData);
  });
}

  addPerson(name: string) {
    this.persons.push(name);
    this.personschanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => {
      return person !== name;
    });
    this.personschanged.next(this.persons);
  }
}
