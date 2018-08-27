const assert = require("assert");
const User = require("../src/user");

describe("Validation for user", () => {
  it("Test is name exsist ", done => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is required");
    done();
  });

  it("name to be longer than 2 charactors", done => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters");
    done();
  });
  it("disallow invalid records ", done => {
    const user = new User({ name: "Al" });

    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer than 2 characters");
      done();
    });
  });
});
