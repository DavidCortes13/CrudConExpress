const express = require('express');
const router = express.Router();

var db = require('../routes/connect');


router.post('/guardarRegistros',(req,res)=>{

    let name = req.body.nameInput;
    let email = req.body.emailInput;
    /* res.send(console.log(name,correo)); */

    //convertir en json nuestros objetos
    let registroObjetos = {nombre: name , correo: email}

    //consulta
    db.query('insert into registros set ?',registroObjetos , (err,result)=>{
        if(err) throw err;
        console.log(err);
        return;
    })

    res.render('mensaje', {mensaje: "Registro exitoso"})
    
    
})

router.get('/listado',(req,res) =>{

    db.query('select *From registros',(error,filas)=>{
        if(error) throw error;
        res.render('userList', {registros:filas} );
    });
} );

router.post('/modificarDatos', (req,res)=>{
    db.query('select *from registros where id =?',req.body.codigo, (err,filas) =>{
        if (err) throw err;
        if(filas.length > 0){
            res.render('formularioActualizar',{registros:filas});
        }else{
            res.render('mensaje',{mensaje: "No existe el codigo con el id ingresado"});
        }
    });
});


router.post("/confimarActualizacion", (req,res)=>{
    let registro = {
        nombre: req.body.nombreUpd,
        correo: req.body.correoUpd
    };

    
    

    db.query('update registros set ? where ?',[registro,{id:req.body.codigo}],

    (err,filas)=>{
        if(err) throw err;

        res.render('mensaje',{mensaje:"Usuario Modificado"});
    })
    
} )


router.get('/borrarUsuario/:id', (req,res )=> {
    
    let sql = `delete from registros where id = ${req.params.id}`;

    let query = db.query(sql, (err,result)=>{
            if(err) throw err;
            res.render('mensaje', {mensaje: "El usuario ha sido eliminado"})
    })
})
module.exports = router;