import React, { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, InputAdornment, Chip, Menu, MenuItem, IconButton, Tooltip, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search, FileDownload, Add, Edit, Delete, CheckCircle, Cancel, Visibility } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { formatDateInTimezone } from '../../services/dateUtils';
import { exportToCSV, exportToExcel, exportToPDF } from '../../services/exportUtils';
import { formatCurrency } from '../../services/formatUtils';
import ProcurementForm from './ProcurementForm';
import ProcurementDetailsDialog from './ProcurementDetailsDialog';
import { deleteRequest, updateStatus } from '../../store/slices/procurementSlice';
import { useTranslation } from '../../hooks/useTranslation';

const ProcurementList = () => {
  const procurements = useSelector((state) => state.procurement.items);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending Approval': return 'warning';
      case 'Rejected': return 'error';
      case 'Draft': return 'default';
      default: return 'primary';
    }
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (idToDelete) {
      dispatch(deleteRequest(idToDelete));
      setDeleteDialogOpen(false);
      setIdToDelete(null);
      showSnackbar(t('Record deleted successfully.'));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setIdToDelete(null);
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateStatus({ id, status }));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200, renderCell: (params) => <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.value}</Typography> },
    { field: 'department', headerName: 'Department', width: 160 },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{formatCurrency(params.value)}</Typography>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 160,
      renderCell: (params) => (
        <Chip label={params.value} color={getStatusColor(params.value)} size="small" sx={{ fontWeight: 600, borderRadius: 1 }} />
      )
    },
    { 
      field: 'createdAt', 
      headerName: 'Date Submitted', 
      width: 150,
      renderCell: (params) => <Typography variant="body2">{formatDateInTimezone(params.value, 'MMM dd, yyyy')}</Typography>
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => {
        const isOwner = params.row.requesterId === user?.id;
        const canEdit = user?.role === 'Administrator' || user?.role === 'Manager' || isOwner;
        const canApprove = user?.role === 'Administrator' || user?.role === 'Manager';

        return (
          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
            <Tooltip title="View Details">
              <IconButton size="small" onClick={() => { setSelectedRequest(params.row); setDetailsOpen(true); }} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}1A` } }}>
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            {canEdit && (
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => { setEditingRequest(params.row); setFormOpen(true); }} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}1A` } }}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {canApprove && params.row.status === 'Pending Approval' && (
              <>
                <Tooltip title="Approve">
                  <IconButton size="small" onClick={() => handleStatusChange(params.row.id, 'Approved')} sx={{ color: theme.palette.success.main, '&:hover': { bgcolor: `${theme.palette.success.main}1A` } }}>
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                  <IconButton size="small" onClick={() => handleStatusChange(params.row.id, 'Rejected')} sx={{ color: theme.palette.error.main, '&:hover': { bgcolor: `${theme.palette.error.main}1A` } }}>
                    <Cancel fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {canEdit && (
              <Tooltip title={t('Delete')}>
                <IconButton size="small" onClick={() => handleDeleteClick(params.row.id)} sx={{ color: theme.palette.text.secondary, '&:hover': { color: theme.palette.error.main, bgcolor: `${theme.palette.error.main}1A` } }}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      }
    }
  ];

  const filteredData = React.useMemo(() => procurements.filter(p => {
    const isOwner = p.requesterId === user?.id;
    const canView = user?.role === 'Administrator' || user?.role === 'Manager' || isOwner;
    if (!canView) return false;
    
    return p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase());
  }), [procurements, user, searchTerm]);

  const handleExport = (type) => {
    handleExportMenuClose();
    if (type === 'csv') exportToCSV(filteredData, 'Procurement_Data', 'Procurement Report', columns);
    if (type === 'excel') exportToExcel(filteredData, 'Procurement_Data', 'Procurement Report', columns);
    if (type === 'pdf') exportToPDF(filteredData, 'Procurement_Data', 'Procurement Report', columns);
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>{t('Procurement Requests')}</Typography>
          <Typography variant="body1" color="text.secondary">{t('Manage procurement lifecycles, purchase requests, and approvals.')}</Typography>
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
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingRequest(null); setFormOpen(true); }} sx={{ py: 1.2, px: { xs: 2, sm: 3 }, flexGrow: { xs: 1, sm: 0 } }}>
            {t('New Request')}
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
            slotProps={{
              toolbar: {
                showQuickFilter: false,
                sx: { p: 2 }
              },
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 15 } },
            }}
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

      <ProcurementForm 
        open={formOpen} 
        onClose={() => setFormOpen(false)} 
        requestToEdit={editingRequest}
      />

      <ProcurementDetailsDialog
        open={detailsOpen}
        onClose={() => { setDetailsOpen(false); setSelectedRequest(null); }}
        request={selectedRequest}
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

export default ProcurementList;
