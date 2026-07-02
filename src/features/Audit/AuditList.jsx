import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, InputAdornment, Chip, Button, Menu, MenuItem, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search, FileDownload } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { mockUsers } from '../../mocks/dataGenerator';
import { formatDateInTimezone } from '../../services/dateUtils';
import { exportToCSV, exportToExcel, exportToPDF } from '../../services/exportUtils';

const AuditList = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const auditLogs = useSelector((state) => state.audit.items) || [];

  const handleExportMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleExportMenuClose = () => setAnchorEl(null);

  const columns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200, renderCell: (params) => <Typography variant="body2">{formatDateInTimezone(params.value, 'yyyy-MM-dd HH:mm:ss')}</Typography> },
    { field: 'module', headerName: 'Module', width: 160, renderCell: (params) => <Chip label={params.value} size="small" sx={{ fontWeight: 600, borderRadius: 1 }} /> },
    { field: 'action', headerName: 'Action', width: 220, renderCell: (params) => <Typography variant="body2" sx={{ fontWeight: 600 }}>{params.value}</Typography> },
    { 
      field: 'userId', 
      headerName: 'User', 
      width: 220,
      renderCell: (params) => {
        const user = mockUsers.find(u => u.id === params.value);
        return <Typography variant="body2">{user ? `${user.name} (${user.role})` : params.value}</Typography>;
      }
    },
    { field: 'details', headerName: 'Details', flex: 1, minWidth: 250 },
  ];

  const filteredData = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (type) => {
    handleExportMenuClose();
    if (type === 'csv') exportToCSV(filteredData, 'Audit_Logs', 'Enterprise Audit Logs', columns);
    if (type === 'excel') exportToExcel(filteredData, 'Audit_Logs', 'Enterprise Audit Logs', columns);
    if (type === 'pdf') exportToPDF(filteredData, 'Audit_Logs', 'Enterprise Audit Logs', columns);
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>Audit Center</Typography>
          <Typography variant="body1" color="text.secondary">Review system activities, security events, and compliance logs.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExportMenuOpen} sx={{ py: 1.2, px: { xs: 2, sm: 3 }, flexGrow: { xs: 1, sm: 0 } }}>
            Export Logs
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleExportMenuClose} slotProps={{ paper: { elevation: 3, sx: { minWidth: 150, mt: 1, borderRadius: 2 } } }}>
            <MenuItem onClick={() => handleExport('csv')} sx={{ py: 1.5 }}>Export as CSV</MenuItem>
            <MenuItem onClick={() => handleExport('excel')} sx={{ py: 1.5 }}>Export as Excel</MenuItem>
            <MenuItem onClick={() => handleExport('pdf')} sx={{ py: 1.5 }}>Export as PDF</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search audit logs..."
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
            initialState={{ pagination: { paginationModel: { pageSize: 25 } }, sorting: { sortModel: [{ field: 'timestamp', sort: 'desc' }] } }}
            pageSizeOptions={[25, 50, 100]}
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
    </Box>
  );
};

export default AuditList;
