const gulp=require('gulp');
const sass=require('gulp-sass');
const webserver=require('gulp-webserver');


gulp.task('devCss',()=>{
    return gulp.src('./src/css/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

gulp.task('watch',()=>{
    gulp.watch('./src/css/scss/*.scss',gulp.series('devCss'));
})

gulp.task('server',()=>{
    return gulp.src('./src')
        .pipe(webserver({
            port:2727,
            livereload:true,
            proxies:[
                //{source:"/getGoods",target:"http://localhost:3000/getGoods"},
                {source:"/api/login",target:"http://localhost:3000/login"},
                {source:"/api/getAccount",target:"http://localhost:3000/getAccount"}
            ]
        }))
})

//搭建开发环境任务
gulp.task('dev',gulp.series('devCss','server','watch'));