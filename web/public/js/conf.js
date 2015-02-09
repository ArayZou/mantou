requirejs.config({
    baseUrl: '/libs',
    paths: {
        jquery: 'jquery/dist/jquery.min',
        bootstrap: 'bootstrap/dist/js/bootstrap.min',
        underscore: 'underscore/underscore-min',
        handlebars: 'handlebars/handlebars.min'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});
