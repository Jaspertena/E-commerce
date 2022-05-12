const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
  include: [
    {
      model: Product,
      attributes: ["product_name"]
    }
  ]
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:[
      {
        model: Product,
        attributes: ["product_name"]
      }
    ]
  })
  .then(data => {
    res.json(data);
  })
})
//     if (!ProductData) {
//       res.status(404).json({ message: 'No location found with this id!' });
//       return;
//     }
// } ) };


router.post('/', (req, res) => {
  // create a new category
  try {
    const ProductData = Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedCategory = Category.update(req.body,{
      where: { id: req.params.id}
    })
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = Category.destroy({
      
     where: {id: req.params.id} })
     res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(error);
  }
  // delete a category by its `id` value
});

module.exports = router;
