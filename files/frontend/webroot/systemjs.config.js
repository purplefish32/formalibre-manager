/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'ng2-slim-loading-bar': 'npm:ng2-slim-loading-bar',
      'primeng': 'node_modules/primeng',
      'moment': 'node_modules/moment',
      'github': 'node_modules/github',
      "simplemde": "node_modules/simplemde",
      "markdown-to-html-pipe": "node_modules/markdown-to-html-pipe",
      "marked": "node_modules/marked",
      "ng2-popover": "node_modules/ng2-popover"
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-slim-loading-bar': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'moment': {
        main: './moment.js',
        defaultExtension: 'js'
      },
      'primeng': {
        defaultExtension: 'js'
      },
      'github': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'simplemde': {
        main: './dist/simplemde.min.js',
        defaultExtension: 'js'
      },
      "markdown-to-html-pipe": {
        "main": "index.js",
        "defaultExtension": "js"
      },
      "marked": {
        "main": "index.js",
        "defaultExtension": "js"
      },
      "ng2-popover": {
        "main": "index.js",
        "defaultExtension": "js"
      }
    }
  });
})(this);
