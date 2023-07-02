
interface Person {
  id: string;
  name: string;
}

export class User {

  pople: Person[];

  constructor() {
    this.pople = [];
  }

  addPerson(id: string, name: string) {

    let person = { id, name }

    this.pople.push(person);

    return this.pople
  }

  getPerson(id: string) {
    let person = this.pople.filter(person => person.id === id)[0]
    return person
  }

  getPeople() {
    return this.pople
  }

  getPeoplebyRoom(room: string) {
    let people = this.pople.filter(person => person.id === room)
    return people
  }


  deletePerson(id: string) {
    let person = this.getPerson(id)
    this.pople = this.pople.filter(person => person.id !== id)
    return person
  }

}


