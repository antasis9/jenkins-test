import { Person } from "../Person";

describe("person", () => {
  it("person get age", () => {
    const person = new Person("harry", 32);
    expect(person.getAge()).toBe(32);
    expect(person.getName()).toBe("harry");
  });
});
