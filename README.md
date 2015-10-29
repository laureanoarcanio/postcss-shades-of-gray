# PostCSS Shades Of Gray [![Build Status][ci-img]][ci]

[PostCSS] Plugin to replace grayscale color to the closest one in a provided set of grays. It helps making the CSS more consistent to design guidelines.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/laureanoarcanio/postcss-shades-of-gray.svg
[ci]:      https://travis-ci.org/laureanoarcanio/postcss-shades-of-gray

```css
.foo {
    color: #ACACAC;
}
```

```css
.foo {
  color: #BBBBBB;
}
```

## Installation

```console
$ npm install postcss-shades-of-gray
```

## Usage

```js
var gulp = require('gulp');
var postcss = require('postcss');
var post    = require('gulp-postcss');
var shades    = require('postcss-shades-of-gray');

postcss().use(shades);

gulp.task('default', function() {
  var postcss = require('gulp-postcss');
  return gulp.src('src/css/*.css')
    .pipe(post([shades({
      shades: ['#FFFFFF', '#BBBBBB', '#444444', '#000000'],
      normalizeHexaTo6: true
    })]))
    .pipe(gulp.dest('build/'));
});
```

See [PostCSS] docs for examples for your environment.
