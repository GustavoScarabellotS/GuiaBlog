const express = require('express');
const app = express();
const conexao = require('./database/basedados');
const Categoria = require('./cont_categoria/Categoria');
const Artigo = require('./cont_artigo/Artigo');
const Usuario = require('./cont_usuario/Usuario')
const ControleCategoria = require('./cont_categoria/controleCategoria');
const ControleArtigo = require('./cont_artigo/controleArtigo');
const ControleUsuario = require('./cont_usuario/controleUsuario');
const { where } = require('sequelize');

const session = require('express-session');
app.use(session({
    secret: "qualquercoisa",
    resave:false,
    saveUninitialized:false,
    //cookie: {maxAge: 20000}
}))
app.get("/teste/sessao", (req, res) =>{
req.session.txt = "teste", 
req.session.usuario={
    nome: "Joao da Silva", 
    senha: 123
}
res.send("gerado")
})
app.get("/teste/leitura", (req, res)=>{
res.json({
texto: req.session.txt,
usuario: req.session.usuario
})
})


app.use("/", ControleCategoria)
app.use("/", ControleArtigo)
app.use("/", ControleUsuario)

app.set("view engine","ejs");
app.use(express.static('public'));

conexao.authenticate().then(()=>{
    console.log("CONECTADO COM O BANCO");
}).catch((erroMsg)=>{
    console.log(erroMsg);
})

app.get("/ler/:slug", (req,res) => {
    let slug = req.params.slug;
    Artigo.findOne({
        where:{
            slug:slug
        }
    }).then((artigo) => {
        res.render("lerartigo",{artigo})
    })
})

app.get("/",(req,res)=>{
    Artigo.findAll().then((artigo) =>{
    res.render("primeiro",{artigo})
})
})


app.get("/", (req, res) => {
    if (req.session.usuario != undefined){
         Artigo.findAll().then((artigo) => {
             res.render("primeiro", {artigo});
    })
    }else {
    
    Artigo.findAll().then((artigo) => {
         res.render("primeirol", {artigo});
    })
}
})


app.listen(3000,()=>{
    console.log("SERVIDOR RODANDO");

})
