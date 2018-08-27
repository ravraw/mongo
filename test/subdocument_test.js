const assert = require("assert");
const User = require("../src/user");

describe("testing subdocuments ", () => {
  it("can create a subdocument ", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("can add new subdocument to posts ", done => {
    const joe = new User({
      name: "Joe",
      posts: []
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "newPost" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === "newPost");
        done();
      });
  });

  it("Can remove a subdocument ", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "newTitle" }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
