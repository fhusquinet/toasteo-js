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
mix.copy('dist/js/toasteo.umd.js', 'docs/js/umd.js')
   .js('docs/js/src.js', 'docs/js/app.js')
   .styles('dist/css/toasteo.css', 'docs/css/toasteo.css');