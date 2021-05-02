const express = require('express');
const app = express();
const path = require('path');

const port =process.env.port || 7000;

app.use(express.urlencoded({extended:false}));


app.set('views',path.join(__dirname,'views'));


//configurar motor de vistas
app.use(express.static(__dirname +'/views'));

app.set('view engine','html');
app.engine('html', require('hbs').__express);

app.use('/',require('./routes/user'));



app.listen(port, () => {
    console.log(`servidor web ha iniciado en el puerto ${port}`)
})