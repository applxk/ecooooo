import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';
import '../../assets/styles/rewardproduct.css';
import Sidebar from '../../components/sidebar';
import ExclamationMarkIcon from '../../assets/images/icons/exclamation-mark.png'; // Import your image

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({ prodName: '', leaves: '', stock: '', sku: '' });
  const [file, setFile] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [errorAdding, setErrorAdding] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // State for delete confirmation

  const [alertType, setAlertType] = useState('success'); // success, info, warning, error
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  // State for zoom modal
  const [openZoomModal, setOpenZoomModal] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState('');

  useEffect(() => {
    fetchRows();
  }, []);

  useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => {
        handleCloseAlert();
      }, 5000); // Set timeout for 5 seconds

      return () => {
        clearTimeout(timer); // Clean up timer on unmount or re-render
      };
    }
  }, [alertOpen]);

  const fetchRows = async () => {
    try {
      const response = await axios.get('http://localhost:3001/eco/product-detail');
      if (Array.isArray(response.data)) {
        setRows(response.data);
      } else {
        console.error('Expected an array from the API response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/eco/product-detail/${id}`);
      setProductDetail(response.data);
      setOpenDetail(true);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  };

  const handleOpenAdd = () => {
    setFormValues({ prodName: '', leaves: '', stock: '', sku: '' });
    setFile(null);
    setOpenAdd(true);
    setErrorAdding('');
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setErrorAdding('');
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setFormValues(row);
    setFile(null);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedRow(null);
    setFormValues({ prodName: '', leaves: '', stock: '', sku: '' });
    setFile(null);
    setOpenEdit(false);
  };

  const handleCloseDetail = () => {
    setProductDetail(null);
    setOpenDetail(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleShowAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const validateForm = () => {
    if (!formValues.prodName || !formValues.leaves || !formValues.stock || !formValues.sku) {
      setErrorAdding('Please fill out all fields.');
      return false;
    }

    if (isNaN(Number(formValues.leaves)) || isNaN(Number(formValues.stock))) {
      setErrorAdding('Leaves and Stock must be valid numbers.');
      return false;
    }

    return true;
  };

  const handleSaveAdd = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prodName', formValues.prodName);
    formData.append('leaves', formValues.leaves);
    formData.append('stock', formValues.stock);
    formData.append('sku', formValues.sku);

    try {
      const response = await axios.post('http://localhost:3001/eco/product-detail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setRows([...rows, response.data]);
        handleCloseAdd();
        handleShowAlert('success', 'Product added successfully!');
      } else {
        setErrorAdding('Error adding product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorAdding('Error adding product. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prodName', formValues.prodName);
    formData.append('leaves', formValues.leaves);
    formData.append('stock', formValues.stock);
    formData.append('sku', formValues.sku);

    try {
      const response = await axios.put(`http://localhost:3001/eco/product-detail/${selectedRow.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const updatedProduct = response.data.product;
        const updatedRows = rows.map(row => (row.id === updatedProduct.id ? updatedProduct : row));
        setRows(updatedRows);
        handleCloseEdit();
        handleShowAlert('success', 'Product updated successfully!');
      } else {
        console.error('Invalid response from the server');
      }
    } catch (error) {
      console.error('Error editing product:', error);
      setErrorAdding('Error editing product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/eco/product-detail/${id}`);
      setRows(rows.filter(row => row.id !== id));
      handleShowAlert('success', 'Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleViewDetail = (id) => {
    fetchProductDetail(id);
  };

  const handleZoomImage = (imageUrl) => {
    setZoomedImageUrl(imageUrl);
    setOpenZoomModal(true);
  };

  const handleCloseZoomModal = () => {
    setOpenZoomModal(false);
    setZoomedImageUrl('');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'prodName', headerName: 'Product Name', width: 130 },
    { field: 'leaves', headerName: 'Leaves', type: 'number', width: 90 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
    { field: 'sku', headerName: 'SKU', type: 'number', width: 90 },
    {
      field: 'prodimg', // New field for product image
      headerName: 'Product Image',
      width: 130,
      renderCell: (params) => (
        <div style={{ textAlign: 'center' }}>
          <img
            src={`http://localhost:3001/eco/product-images/${params.value}`} // Adjust URL as per your backend
            alt="Product"
            style={{ width: 50, height: 50, cursor: 'pointer' }}
            onClick={() => handleZoomImage(`http://localhost:3001/eco/product-images/${params.value}`)}
          />
        </div>
      ),
    },
 {
      field: 'edit',
      headerName: 'Edit',
      width: 130,
      renderCell: (params) => (
        <div>
          <Button variant="contained" className='editbutton' onClick={() => handleOpenEdit(params.row)}>
            Edit
          </Button>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 130,
      renderCell: (params) => (
        <div>
          <DeleteIcon style={{ cursor: 'pointer', color: 'red'}} onClick={() => setDeleteConfirmation(params.row.id)} />
        </div>
      ),
    },
  ];


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const deleteModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: 300,
    maxWidth: 500,
    width: '30%',
    textAlign: 'center',
  };

  return (
    <div className="rewardshopback">

      {/* sidebar */}
      <Sidebar />

      <div className='header'>
        <h2>Redemption Shop</h2>
      </div>

      {/* Alert Component for displaying messages */}
      {alertOpen && (
        <Alert severity={alertType} onClose={handleCloseAlert} sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%' }}>
          <AlertTitle>{alertType === 'success' ? 'Success' : alertType === 'info' ? 'Info' : alertType === 'warning' ? 'Warning' : 'Error'}</AlertTitle>
          {alertMessage}
        </Alert>
      )}

      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id} // Ensure each row has a unique id
          pageSize={5}
          checkboxSelection
          className="data-grid"
        />
      </div>
      <Button variant="contained" onClick={handleOpenAdd} className='addnewproductbutton'>
        Add New Product
      </Button>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={{ ...style, width: 400 }}>
          <h2 className='popup'>Add New Product</h2>
          <hr></hr>
          <TextField fullWidth margin="normal" label="Product Name" name="prodName" value={formValues.prodName} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Leaves" name="leaves" type="number" value={formValues.leaves} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="SKU" name="sku" value={formValues.sku} onChange={handleInputChange} />
          <input type="file" accept="image/*" onChange={handleFileChange} /> {/* Add file input */}
          <Button variant="contained" onClick={handleSaveAdd} className='addbutton'>
            Add
          </Button>
          <Button variant="contained" onClick={handleCloseAdd} className='cancelbutton'>
            Cancel
          </Button>
          {errorAdding && <p style={{ color: 'red' }}>{errorAdding}</p>}
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ ...style, width: 400 }}>
          <h2 className='popup'>Edit Product</h2>
          <hr></hr>
          <TextField fullWidth margin="normal" label="Product Name" name="prodName" value={formValues.prodName} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Leaves" name="leaves" type="number" value={formValues.leaves} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="SKU" name="sku" value={formValues.sku} onChange={handleInputChange} />
          <input type="file" onChange={handleFileChange} /> {/* Add file input */}
          <Button variant="contained" className='savebutton' onClick={handleSaveEdit} style={{ marginTop: '10px', marginRight: '10px' }}>
            Save Changes
          </Button>
          <Button variant="contained" className='cancelbutton' onClick={handleCloseEdit} style={{ marginTop: '10px' }}>
            Cancel
          </Button>
          {errorAdding && <p style={{ color: 'red' }}>{errorAdding}</p>}
        </Box>
      </Modal>


      {/* Delete Confirmation Modal */}
      <Modal open={deleteConfirmation !== null} onClose={() => setDeleteConfirmation(null)}>
        <Box sx={deleteModalStyle}>
          <img src={ExclamationMarkIcon} alt='Exclamation Mark' width={'70px'} height={'70px'} className='icon'/>
          <p>Are you sure you want to delete this product?</p>
          <Button variant="contained" className='deletebutton' onClick={() => { handleDelete(deleteConfirmation); setDeleteConfirmation(null); }}>
            Delete
          </Button>
          <Button variant="contained" className='cancelbutton' onClick={() => setDeleteConfirmation(null)}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Zoom Modal for Product Image */}
      <Modal open={openZoomModal} onClose={handleCloseZoomModal}>
        <Box sx={{ ...style, width: 'auto', maxWidth: '80%' }}>
          <img src={zoomedImageUrl} alt="Zoomed Product" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Modal>
    </div>
  );
};

export default DataTable;
