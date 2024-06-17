import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../assets/styles/rewardproduct.css';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({ prodimg: '', prodName: '', leaves: '', stock: '', sku: '' });

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    try {
      const response = await axios.get('/api/product-detail');
      if (Array.isArray(response.data)) {
        setRows(response.data);
      } else {
        console.error('Expected an array from the API response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpenAdd = () => {
    setFormValues({ prodimg: '', prodName: '', leaves: '', stock: '', sku: '' });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setFormValues(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedRow(null);
    setFormValues({ prodimg: '', prodName: '', leaves: '', stock: '', sku: '' });
    setOpenEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveAdd = async () => {
    try {
      const response = await axios.post('/api/product-detail', formValues);
      if (response.status === 201) {
        setRows([...rows, response.data]);
        handleCloseAdd();
      } else {
        console.error('Invalid response from the server');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`/api/product-detail/${selectedRow.id}`, formValues);
      if (response.status === 200) {
        const updatedRows = rows.map(row => (row.id === selectedRow.id ? response.data : row));
        setRows(updatedRows);
        handleCloseEdit();
      } else {
        console.error('Invalid response from the server');
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product-detail/${id}`);
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'prodimg', headerName: 'Product Image', width: 130 },
    { field: 'prodName', headerName: 'Product Name', width: 130 },
    { field: 'leaves', headerName: 'Leaves', type: 'number', width: 90 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
    { field: 'sku', headerName: 'SKU', type: 'number', width: 90 },
    {
      field: 'edit',
      headerName: 'Edit Leaves',
      width: 130,
      renderCell: (params) => (
        <div>
          <Button variant="contained" onClick={() => handleOpenEdit(params.row)}>Edit</Button>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete Leaves',
      width: 130,
      renderCell: (params) => (
        <div>
          <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDelete(params.row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="rewardshopback">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleOpenAdd} style={{ marginTop: '10px' }}>
        Add New Product
      </Button>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={{ ...style, width: 400 }}>
          <h2>Add New Product</h2>
          <TextField fullWidth margin="normal" label="Product Image" name="prodimg" value={formValues.prodimg} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Product Name" name="prodName" value={formValues.prodName} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Leaves" name="leaves" type="number" value={formValues.leaves} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="SKU" name="sku" type="number" value={formValues.sku} onChange={handleInputChange} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleSaveAdd}>
            Save
          </Button>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ ...style, width: 400 }}>
          <h2>Edit Product</h2>
          <TextField fullWidth margin="normal" label="Product Image" name="prodimg" value={formValues.prodimg} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Product Name" name="prodName" value={formValues.prodName} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Leaves" name="leaves" type="number" value={formValues.leaves} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" value={formValues.stock} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="SKU" name="sku" type="number" value={formValues.sku} onChange={handleInputChange} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleSaveEdit}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default DataTable;
