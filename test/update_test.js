const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === "Alex");
      done();
    });
  }

  it("instance set n save", done => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });

  it("A model instance can update", done => {
    assertName(joe.update({ name: "Alex" }), done);
  });

  it("a model class - update", done => {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("a model class - update one record ", done => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("a model class - find with Id and update ", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  xit("find and update the count ", done => {
    User.update({ name: "Joe" }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => assert(user.postCount === 10));
    done();
  });
});
