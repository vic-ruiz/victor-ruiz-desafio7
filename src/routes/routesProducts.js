import { Router } from "express";
import Container from '../apiClassProducts.js'
import {options} from '../../configDB.js'
const router = Router()
const container = new Container(options.mariaDB, 'products')

router.get('/', async(req,res)=>{
    const products = await container.findAll()
    res.json(products)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await container.getById(parseInt(id));
  
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Product not found" });
  });

  router.post("/", async (req, res) => {
    const { body } = req;
    await container.save(body);
    res.json({message: 'Producto guardado', producto: body});
  });

  router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await container.deleteById(id);
    res.json({message: `Product with ID: ${id} was deleted`});
  })

module.exports = router;