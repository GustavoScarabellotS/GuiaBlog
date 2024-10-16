const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const slugify = require('slug');
const Categoria = require('../cont_categoria/Categoria');
const Artigo = require('./Artigo');

router.use(bodyParser.urlencoded({extended:true}));

router.get("/novoartigo", (req,res)=>{
    Categoria.findAll().then((artigo)=>{
        res.render("artigos/cad_artigo",{artigo})
    })
})

router.get("/controleartigo", (req, res) => {
    Artigo.findAll({
        include:[{model:Categoria,as:'categoria'}]
    }).then((artigo) => {
        res.render("artigos/controle_artigos", {artigo});
    })
})

router.get("/editartigo/:id", (req, res) => {
    let id = req.params.id;
    Artigo.findByPk(id).then((artigo) => {
      Categoria.findAll().then((categoria) => {
        res.render("artigos/alte_artigo", {artigo, categoria});
      });
    });
});
    
router.post("/deletaartigo", (req, res) => {
    id = req.body.id;
    Artigo.destroy({
        where: {
            id_artigo: id
        }
    }).then(() => {
        res.redirect("/controleartigo")
    })
})

router.post("/updateartigo", (req,res)=>{
    let id = req.body.id;
    let titulo = req.body.titulo;
    let body = req.body.body;
    let categoria = req.body.categoria;
    Artigo.update({
        titulo:titulo,
        body:body,
        categoria_id:categoria,
        slug: slugify(titulo),
    },
    {
     where:{
        id_artigo:id
     }   
    }).then(()=>{
        res.redirect("/controleartigo")
    })
})

router.post("/salvaartigo",(req,res) =>{
    var titulo = req.body.titulo;
    var body = req.body.body;
    var categoria = req.body.categoria;
    Artigo.create({
        titulo: titulo,
        body:body,
        slug:slugify(titulo),
        categoria_id: categoria
    }).then(()=>{
        res.redirect("/novoartigo")
    })
})
module.exports = router;