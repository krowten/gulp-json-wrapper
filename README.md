gulp-json-wrapper
=================

Create javascript config from json file. Plugin for [gulp](https://github.com/gulpjs/gulp)

#Install

```
npm install gulp-json-wrapper
```

#Basic Usage

Something like this:

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat')
var json = require('gulp-json-wrapper')

gulp.task('js', function () {
	gulp.src('./scripts/*.js')
	    .pipe(json({
	      src: 'path/to/config.json',
	      namespace: 'myconfig'
	    }))
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./js'));
});
```


## gulp-json-wrapper specific options

#### `src: String`

Path to json file.

#### `angular: Boolean`

Wrapped in angular module. Default false.

#### `module: String`

Name of angular module. Default 'json'.

#### `namespace: String`

Variable name. Default 'config'.
