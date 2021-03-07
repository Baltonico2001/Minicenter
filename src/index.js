const express= require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');

const app=express();

app.set('port',process.env.PORT || 4000);

app.set('views',path.join(__dirname,'views' ));

app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales
app.use((req,res,next)=>{
    next();
});

//rutas
app.use(require('./routes/index'));


app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/link',require('./routes/links'));
app.use('/locales',require('./routes/locales'));
app.use('/parqueadero',require('./routes/parqueadero'));
app.use('/personal',require('./routes/personal'));
app.use('/servicios',require('./routes/servicios'));
app.use('/mantenimientos',require('./routes/mantenimientos'));
app.use('/covid',require('./routes/covid'));
app.use('/preguntas',require('./routes/preguntas'));









//app.use(require('./routes/usuarios'));
//app.use('/usuarios',require('./routes/usuarios'));

//app.use('/estudiantes',require('./routes/index.js'));
//app.use('/estudiantes'),require('./routes')
//app.use('/docentes',require('./routes/docentes'));
//app.use('/usuarios',require('./routes/usuarios'));
//app.use('/usuarios',require('./routes/usuarios'));








//public
app.use(express.static(path.join(__dirname,'public')));


//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
});