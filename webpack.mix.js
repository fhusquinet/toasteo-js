let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('docs/js/src.js', 'docs/js/app.js')
   .styles('src/css/toasteo.css', 'dist/css/toasteo.css')
   .styles('src/css/toasteo.css', 'docs/css/toasteo.css');