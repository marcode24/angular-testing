import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  person: Person = new Person('test','test',1,1,1);
  people: Person[] = [
    new Person('test','test',1,1,1),
    new Person('test2','test2',2,150, 1.5),
  ]

  selectedPerson: Person | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  choosePerson(person: Person) {
    this.selectedPerson = person;
  }
}
