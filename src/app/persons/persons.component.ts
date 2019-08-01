import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  isFetching = false;
  private personListSubs: Subscription;
 // private personService: PersonsService;

  constructor(private prsService: PersonsService) {
   // this.personList = prsService.persons;
   // this.personService = prsService;
  }

  ngOnInit() {
     this.personListSubs = this.prsService.personschanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });
     this.isFetching = true;
     this.prsService.fetchPersons();
  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(personName);
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }
}
