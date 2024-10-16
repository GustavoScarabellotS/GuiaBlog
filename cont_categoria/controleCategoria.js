const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const slugify = require('slug');
const Categoria = require('./Categoria');

router.use(bodyParser.urlencoded({extended:true}));

router.get("/novo",(req,res)=>{
    res.render("categorias/cad_categoria");
})

router.get("/controlecategoria", (req,res)=>{
    Categoria.findAll().then((categoria)=>{
        res.render("categorias/controle_categ",{categoria})
    })
})

router.post("/updatecateg",(req, res)=>{
    id = req.body.id;
    titulo = req.body.titulo;
    Categoria.update(
        {titulo:titulo, 
        slug:slugify(titulo)}, 
        {where:{id_categoria:id}}
    ).then(()=>{
        res.redirect("/controlecategoria")
    })
})

router.post("/deletacateg", (req, res)=>{
    var id = req.body.id;
    Categoria.destroy({
        where:{
            id_categoria:id
        }
    }).then(()=>{
        res.redirect("/controlecategoria")
    })
})

router.get("/editacateg/:id", (req, res)=>{
    let id = req.params.id;
    Categoria.findByPk(id).then((categoria)=>{
        res.render("categorias/alte_categoria", {categoria})
    })
})

router.post("/salvacateg", (req,res)=>{
    titulo = req.body.titulo;
    Categoria.create({
        titulo: titulo,
        slug: slugify(titulo)
    }).then(()=>{
        res.redirect("/novo");
    })
})

module.exports = router;