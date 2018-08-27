const assert = require("assert");
const User = require("../src/user");

describe("Vertual type ", () => {
  it("postcount returns number odf posts ", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
