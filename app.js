var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var estudiantesRouter = require('./routes/estudiantes');
var cursosRouter = require('./routes/cursos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/estudiantes', estudiantesRouter);
app.use('/cursos', cursosRouter);
module.exports = app;

