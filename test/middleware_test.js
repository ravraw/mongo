const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware - remove user and blogposts", () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is great",
      content: "Yep it is !"
    });
    joe.blogPosts.push(blogPost);
    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("can delete blogposts on deletung a user", () => {
    joe
      .remove()
      .then(() => {
        BlogPost.count();
      })
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
