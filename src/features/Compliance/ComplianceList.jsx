import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Button, TextField, InputAdornment, Menu, MenuItem, IconButton, Tooltip, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { formatDateInTimezone } from '../../services/dateUtils';
import { Search, FileDownload, Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCompliance } from '../../store/slices/complianceSlice';
import { exportToCSV, exportToExcel, exportToPDF } from '../../services/exportUtils';
import ComplianceForm from './ComplianceForm';
import ComplianceDetailsDialog from './ComplianceDetailsDialog';
import { useTranslation } from '../../hooks/useTranslation';

const ComplianceList = () => {
  const compliances = useSelector((state) => state.compliance.items);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCompliance, setEditingCompliance] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleExportMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleExportMenuClose = () => setAnchorEl(null);

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (idToDelete) {
      dispatch(deleteCompliance(idToDelete));
      setDeleteDialogOpen(false);
      setIdToDelete(null);
      showSnackbar(t('Record deleted successfully.'));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setIdToDelete(null);
  };

  const columns = [
    { field: 'title', headerName: 'Certification / Policy', flex: 1, minWidth: 200, renderCell: (params) => <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.value}</Typography> },
    { field: 'type', headerName: 'Type', width: 160 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Compliant' ? 'success' : params.value === 'Expired' ? 'error' : 'warning'} 
          size="small" 
          sx={{ fontWeight: 600, borderRadius: 1 }}
        />
      )
    },
    { 
      field: 'expirationDate', 
      headerName: 'Expiration Date', 
      width: 180,
      renderCell: (params) => <Typography variant="body2">{formatDateInTimezone(params.value, 'MMM dd, yyyy')}</Typography>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => { setSelectedCompliance(params.row); setDetailsOpen(true); }} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}1A` } }}>
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => { setEditingCompliance(params.row); setFormOpen(true); }} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}1A` } }}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Delete')}>
            <IconButton size="small" onClick={() => handleDeleteClick(params.row.id)} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.error.main, bgcolor: `${theme.palette.error.main}1A` } }}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  const filteredData = compliances.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (type) => {
    handleExportMenuClose();
    if (type === 'csv') exportToCSV(filteredData, 'Compliance_Data', 'Compliance Report', columns);
    if (type === 'excel') exportToExcel(filteredData, 'Compliance_Data', 'Compliance Report', columns);
    if (type === 'pdf') exportToPDF(filteredData, 'Compliance_Data', 'Compliance Report', columns);
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>{t('Compliance Registry')}</Typography>
          <Typography variant="body1" color="text.secondary">{t('Monitor audit records, certificates, and compliance controls.')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExportMenuOpen} sx={{ py: 1.2, px: { xs: 2, sm: 3 }, flexGrow: { xs: 1, sm: 0 } }}>
            {t('Export')}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleExportMenuClose} slotProps={{ paper: { elevation: 3, sx: { minWidth: 150, mt: 1, borderRadius: 2 } } }}>
            <MenuItem onClick={() => handleExport('csv')} sx={{ py: 1.5 }}>Export as CSV</MenuItem>
            <MenuItem onClick={() => handleExport('excel')} sx={{ py: 1.5 }}>Export as Excel</MenuItem>
            <MenuItem onClick={() => handleExport('pdf')} sx={{ py: 1.5 }}>Export as PDF</MenuItem>
          </Menu>
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingCompliance(null); setFormOpen(true); }} sx={{ py: 1.2, px: { xs: 2, sm: 3 }, flexGrow: { xs: 1, sm: 0 } }}>
            {t('Add')}
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder={t('Search') + '...'}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 300 } }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
                sx: { bgcolor: 'background.paper' }
              }
            }}
          />
        </Box>

        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: false, sx: { p: 2 } } }}
            initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
            pageSizeOptions={[15, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.divider}`,
              }
            }}
          />
        </Box>
      </Paper>

      <ComplianceForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        complianceToEdit={editingCompliance}
      />

      <ComplianceDetailsDialog
        open={detailsOpen}
        onClose={() => { setDetailsOpen(false); setSelectedCompliance(null); }}
        compliance={selectedCompliance}
      />
<Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {t('Confirm Deletion')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {t('Are you sure you want to delete this record? This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
<Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComplianceList;
