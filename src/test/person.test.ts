import { Person } from "../Person";

describe("person", () => {
  it("person get age", () => {
    const person = new Person("harry", 31);
    expect(person.getAge()).toBe(31);
  });
});
