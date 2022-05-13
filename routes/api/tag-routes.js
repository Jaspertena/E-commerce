const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
    id: req.params.id
  },
  include:[
    {
      model: Product,
      attributes: ["tag_name"]
    },
    {
      model: ProductTag,
      attributes: ["producttag_name"]
    },
]
})
.then(data => {
res.json(data);
})
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include:[
        {
          model: Product,
          attributes: ["tag_name"]
        },
        {
          model: ProductTag,
          attributes: ["producttag_name"]
        },
    ]
  })
  .then(data => {
    res.json(data);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((product_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
