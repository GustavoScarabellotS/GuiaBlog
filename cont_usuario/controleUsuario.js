const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Usuario = require ('./Usuario');
const bcrypt = require('bcryptjs');
const adminAut = require("../middleware/adminAutoriz");

router.get("/novo", adminAut, (req, res) => {
    res.render("categorias/cad_categoria");
    });
    router.get("/controlecategoria", adminAut, (req, res) => {
    Categoria.findAll().then((categoria) => {
    res.render("categorias/controle_categ", { categoria });
    });
     });


router.use(bodyParser.urlencoded({extended:true}));

router.get("/novousuario",(req,res)=>{
    res.render("usuarios/cadastrausuario");
})

router.get("/loginusuario",(req,res)=>{
    res.render("usuarios/loginusuario");
})

router.post("/user/addsenha", (req,res)=> {
    let login = req.body.login;
    Usuario.findOne({
        where:{login:login}
    }).then((usuario) => {
        if (usuario == undefined) {
            let senha = req.body.senha;
            let criahash = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, criahash);
            Usuario.create({
                login: login,
                senha: hash,
            }).then(() => {
                res.render("usuarios/cadastrausuario")
            })
        }else {
            res.redirect("/")
        }
    })
})

router.post("/user/loginuser", (req, res) => {
    let login = req.body.login;
    let senha = req.body.senha;
    Usuario.findOne({
    where: {
    login:login
    }
    }).then((usuario) => {
    if (usuario != undefined) {
    var correta=bcrypt.compareSync(senha, usuario.senha)
    if (correta) {
    req.session.usuario ={
    id: usuario.id_usuario,
    login: usuario.login
    
    } 
     res.redirect("/")
 } else {
    res.redirect("/loginusuario")
    }
    } else {
    res.redirect("/loginusuario")
    }
})
})

router.get("/logout", (req, res)=>{
    req.session.usuario = undefined/ 
    res.redirect("/")
    })

module.exports = router;