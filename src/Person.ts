export class Person {
  constructor(private name: string, private age: number) {}

  getAge(): number {
    return this.age;
  }

  setAge(age: number) {
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }
}
