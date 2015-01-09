(function(){
    "use strict";

    //import modules
    var gulp = require("gulp"),
        eslint = require("gulp-eslint"),
        karma = require("gulp-karma"),
        lab = require("gulp-lab"),
        protractor = require("gulp-protractor").protractor,
        sass = require("gulp-sass"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        ngAnnotate = require("gulp-ng-annotate"),
        sourcemaps = require("gulp-sourcemaps"),
        source = require("vinyl-source-stream"),
        buffer = require("vinyl-buffer"),
        watchify = require("watchify"),
        connect = require("gulp-connect"),
        browserify = require("browserify");

    //file arrays
    var serverFiles = ["./server/*.js", "./server/**/*.js"],
        angularFiles = ["./server/public/angular/*.js", "./server/public/angular/**/*.js"],
        serverTestFiles = ["./test/api/*.js"],
        karmaTestFiles = ["./test/frontend/unit/*.js"],
        protractorTestFiles = ["./test/frontend/acceptance/*.js"],
        sassFiles = ["./server/public/css/*.scss", "./server/public/css/*/*.scss"],
        allFiles = serverFiles.concat(angularFiles);

    //Useful for js compression. Used for task browserify
    var getBundleName = function () {
        var version = require('./package.json').version;
        var name = require('./package.json').name;
        return version + '.' + name + '.' + 'min';
    };
    //task for angular acceptance test
    gulp.task("acceptance-test", function () {
        return gulp.src(protractorTestFiles)
            .pipe(protractor({
                configFile: "./test/frontend/config/protractor.conf.js"
            }))
            .on("error", function (err) {
                throw err;
            })
    });

    //task for angular unit test
    gulp.task("unit-test", function () {
        return gulp.src(karmaTestFiles)
            .pipe(karma({
                configFile: "./test/frontend/config/karma.config.js",
            }))
            .on("error", function (err) {
                throw err;
            });
    });

    //task for lab test
    gulp.task("server-test", function () {
       return gulp.src(serverTestFiles)
            .pipe(lab());
    });

    //task for linting
    gulp.task("lint", function () {
        return gulp.src(allFiles)
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
    });

    //task for sassing development
    gulp.task("sass-dev", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass())
            .pipe(gulp.dest("./server/public/css/"));
    });

    //task for sassing production
    gulp.task("sass-production", function () {
        return gulp.src("./server/public/css/main.scss")
            .pipe(sass({
                outputStyle: "compressed"
            }))
            .pipe(gulp.dest("./server/public/css/"));
    });

    //task for minifying
    gulp.task("compress", function () {
       return gulp.src(angularFiles)
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest("./server/public/js/"))
    });

    //task to start server
    gulp.task("serve", function () {
        console.log("starting server");
        connect.server({
            root: "server",
            port: 9001
        });
    })

    //task for travis
    gulp.task("travis",["serve"] ,function () {
        console.log("sass, uglify and tests passed");
        return gulp.src(protractorTestFiles)
            .pipe(protractor({
                configFile: "./test/frontend/config/protractor.conf.js"
            }))
            .on("error", function (err) {
                throw err;
            }) 
    });

    //task for when developing
    gulp.task("file-watch",  function () {
        gulp.watch(allFiles, ["lint"]);
        gulp.watch("./server/public/css/main.scss", ["sass-dev"]);
        console.log("gulp is watching for linting and sass changes...");
    });

    gulp.task("test-watch", function () {
        gulp.watch(karmaTestFiles, angularFiles, ["unit-test"]);
        gulp.watch(serverFiles.concat(serverTestFiles), ["server-test"]);
        console.log("gulp is watching for test changes...");
    });

    gulp.task("browserify", function () {

        var bundler = browserify({
            entries: ["./server/public/angular/app.js"],
            debug: true
        });connect.server({
            root: "server",
            port: 9001
        });
        
        return console.log("sass, uglify and tests passed");
    });

    //task for when developing
    gulp.task("file-watch",  function () {
        gulp.watch(allFiles, ["lint"]);
        gulp.watch(sassFiles, ["sass-dev"]);
        console.log("gulp is watching for linting and sass changes...");
    });

    gulp.task("test-watch", function () {
        gulp.watch(karmaTestFiles, angularFiles, ["unit-test"]);
        gulp.watch(serverFiles.concat(serverTestFiles), ["server-test"]);
        console.log("gulp is watching for test changes...");
    });

    gulp.task("browserify", function () {

        var bundler = browserify({
            entries: ["./server/public/angular/app.js"],
            debug: true
        });

<<<<<<< HEAD
        var bundle = function() {
=======

        var bundle = function() {
            console.log(getBundleName());
>>>>>>> dev
            return bundler
                .bundle()
                .pipe(source(getBundleName() + '.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./server/public/js/'));
        }
        return bundle();
    });


<<<<<<< HEAD
    gulp.task("watchify", function () {
=======
    gulp.task("browserify-watch", function () {
>>>>>>> dev

        var bundler = watchify(browserify("./server/public/angular/app.js", watchify.args));

        var bundle = function() {
<<<<<<< HEAD
=======
            console.log(getBundleName());
>>>>>>> dev
            return bundler
                .bundle()
                .pipe(source(getBundleName() + '.js'))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./server/public/js/'));
        }
        return bundle();
    });

}());
