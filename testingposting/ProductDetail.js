const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

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

module.exports = (sequelize) => {
  const ProductDetail = sequelize.define('ProductDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prodName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    leaves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imageFile: {
      type: DataTypes.STRING(100), // Adjust size as necessary
      allowNull: true, // Depending on your application logic
    }
  }, {
    tableName: 'product_details',
    hooks: {
      // Hook to delete file from uploads directory when a record is deleted
      beforeDestroy: (instance, options) => {
        if (instance.imageFile) {
          const filePath = path.join(__dirname, '..', 'uploads', instance.imageFile);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
    }
  });

  // Method to handle file upload
  ProductDetail.uploadProductImage = function (req, res, callback) {
    upload(req, res, function (err) {
      if (err) {
        return callback(err);
      }
      // File uploaded successfully, save file path in database
      const filePath = req.file ? req.file.path : null;
      callback(null, filePath);
    });
  };

  return ProductDetail;
};
