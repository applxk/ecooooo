const express = require('express');
const router = express.Router();
const { ProductDetail } = require('../models'); // Adjust this import based on your project structure
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const yup = require('yup');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 } // 1MB file size limit
}).single('file'); // Field name for file input

// Validation schema using yup
const validationSchema = yup.object({
  prodName: yup.string().trim().min(3).max(100).required(),
  leaves: yup.number().min(0).required(),
  stock: yup.number().min(0).required(),
  sku: yup.string().trim().min(3).max(50).required()
});

// POST route to create a new product detail with file upload
router.post('/product-detail', upload, async (req, res) => {
  try {
    // Validate request body (excluding file) using yup schema
    const { prodName, leaves, stock, sku } = req.body;
    await validationSchema.validate({ prodName, leaves, stock, sku }, { abortEarly: false });

    // Create new product detail
    const newProduct = await ProductDetail.create({
      prodName,
      leaves,
      stock,
      sku,
      prodimg: req.file ? req.file.filename : null // Save file filename in the database
    });

    res.status(201).json(newProduct); // Respond with the newly created product detail
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});

// GET route to fetch all product details
router.get('/product-detail', async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { prodName: { [Op.like]: `%${search}%` } },
      { sku: { [Op.like]: `%${search}%` } }
    ];
  }

  try {
    const productList = await ProductDetail.findAll({
      where: condition,
      order: [['createdAt', 'DESC']]
    });
    res.json(productList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product list', error: error.message });
  }
});

router.get('/product-detail/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const productDetail = await ProductDetail.findByPk(id);
    if (!productDetail) {
      res.sendStatus(404);
      return;
    }

    // Assuming prodimg contains the filename of the uploaded image
    const filename = productDetail.prodimg;

    // Return the filename (or URL if applicable) in your API response
    res.json({
      ...productDetail.toJSON(),
      prodimg: filename  // Ensure prodimg field returns the filename
    });
  } catch (error) {
    res.status(500).json({ message: `Error fetching product with id ${id}`, error: error.message });
  }
});

// PUT route to update a product detail by id
router.put('/product-detail/:id', upload, async (req, res) => {
  const id = req.params.id;
  try {
    let productDetail = await ProductDetail.findByPk(id);
    if (!productDetail) {
      res.sendStatus(404);
      return;
    }

    // Validate request body (excluding file) using yup schema
    const { prodName, leaves, stock, sku } = req.body;
    await validationSchema.validate({ prodName, leaves, stock, sku }, { abortEarly: false });

    // Update product detail
    const updatedFields = {
      prodName,
      leaves,
      stock,
      sku,
      prodimg: req.file ? req.file.filename : productDetail.prodimg // Update file path if new file uploaded
    };
    const updatedProduct = await productDetail.update(updatedFields);

    res.json({ message: 'Product detail updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: `Error updating product with id ${id}`, error: error.message });
  }
});
// Route to serve images based on filename
router.get('/product-images/:filename', (req, res) => {
  const filename = req.params.filename;
  // Construct the path to the image file
  const imagePath = path.join(__dirname, '../uploads', filename); // Adjust the path as per your file storage location

  // Send the file as a response
  res.sendFile(imagePath);
});

// DELETE route to delete a product detail by id
router.delete('/product-detail/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const num = await ProductDetail.destroy({ where: { id: id } });
    if (num === 1) {
      res.json({ message: 'Product detail deleted successfully' });
    } else {
      res.status(400).json({ message: `Cannot delete product detail with id ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error deleting product with id ${id}`, error: error.message });
  }
});

module.exports = router;
