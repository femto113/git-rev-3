# git-rev-3

access git revision state in node

This is forked from [git-rev](https://www.npmjs.com/package/git-rev) by @tblobaum.
It is otherwise unrelated to, but is quite similar in effect to [git-rev-2](https://www.npmjs.com/package/git-rev)
by @yanatan16.  At the moment I'm not planning on publishing this to NPM, so I'd recommend git-rev-2 if you want
actual released code.

The main changes versus the original are to support standard `(error, data)` callback signatures and 
allow specifying another directory to run the git commands in.  It also has a hack inspired by @marcoceppi
to deal with escaping quotes in commit messages.

# Usage

``` js

// var git = require('git-rev-3');         // use location of module as cwd for git commands (git-rev behavior)
var git = require('git-rev-3')(__dirname); // give location of this file as cwd

git.short(function (error, str) {
  console.log('short', str)
  // => short aefdd94
});

git.long(function (error, str) {
  console.log('long', str)
  // => long aefdd946ea65c88f8aa003e46474d57ed5b291d1
});

git.branch(function (error, str) {
  console.log('branch', str)
  // => branch master
});

git.tag(function (error, str) {
  console.log('tag', str)
  // => tag 0.1.0
});

git.log(2, function (error, log) { // optional numeric first argument limits the number of records
  console.log('log', JSON.stringify(log));
  // => log [
  //  [ "...commit hash...", "most recent log message", "2 hours ago", "Ken Woodruff" ],
  //  [ "...commit hash...", "prior log message", "4 hours ago", "Ken Woodruff" ]
  // ]
});

```

# License

MIT (see [LICENSE](./LICENSE) for details).
