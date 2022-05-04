const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
  const categoryData =  Category.findAll({
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
    const ProductData = Product.create(req.body);
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
