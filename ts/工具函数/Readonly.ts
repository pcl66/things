interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;

const p: ReadonlyPerson = {
  name: 'Jack',
  age: 32
}

p.age = 1