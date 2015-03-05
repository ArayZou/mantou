requirejs.config({
    paths: {
        jquery: '/libs/jquery/dist/jquery.min',
        bootstrap: '/libs/bootstrap/dist/js/bootstrap.min',
        underscore: '/libs/underscore/underscore-min',
        handlebars: '/libs/handlebars/handlebars.min',
        marked: '/js/plugins/marked',
        markdownjs: '/js/plugins/bootstrap-markdown'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        marked: {
            deps: ['jquery'],
            exports: 'marked'
        },
        markdownjs: {
            deps: ['jquery'],
            exports: 'markdownjs'
        }
    }
});
