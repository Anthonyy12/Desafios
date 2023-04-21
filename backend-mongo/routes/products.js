var express = require('express');
var router = express.Router();
let productModel=require('../models/productModel'); 

/* Listado de productos. */
router.get('/', async function(req, res, next) {
  const resultado = await productModel.find(); 
  
  res.json(resultado);
});

/* Listado de productos. */
router.post('/', async function(req, res, next) {
let producto = new productModel({
  id:req.body.id,
  name:req.body.name, 
  description: req.body.description, 
  price: req.body.price,
  images: req.body.images
}); 

 let result = await producto.save(); 
  res.json( 'Se agrega' );
});

/* Listado de productos. */
router.put('/', async function(req, res, next) {
  const filter = {id: req.query.id}; //condicion con query 
  const update = {name: req.query.name};

  const resultado = await productModel. findOneAndUpdate(filter, update,{
    new: true, 
    upsert: true
  }); 
  res.json("Se actualizo el producto")
});

/* Listado de productos. */
router.delete('/:id', async function(req, res, next) {

  //Buscar un producto por ID y regresar una lista 
  const result = await productModel.find({id:req.params.id}).exec(); 

  // Si se encontró lo eliminado 

  if(result.length > 0){
    await productModel.deleteOne({id: req.params.id});
    res.json("Producto eliminado");
  }else {
    res.json({error: "No se encontró el producto con Id" + req.params.id})
  }

});

module.exports = router;
