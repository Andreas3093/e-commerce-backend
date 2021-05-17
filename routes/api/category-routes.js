const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:
    {
      model: Product,
      attribute:['product_name']
    }
  }).then((result) =>{
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk((req.params.id),{
    where:{
      id:req.params.id
    },
    include:{
      model:Product,
      attributes:["product_name"]
    }
  }).then((result)=>{
    if(!result){
      res.status(404).json({message:"sorry no data with this id!"});
      return;
    }
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:req.params.id
  }).then(category=>{
    if(!category){
      res.status(404).json({message:"Cannot update category with this id"});
      return;
    }
  }).catch(err=>{
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "id not found" });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
