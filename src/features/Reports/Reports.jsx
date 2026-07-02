import React from 'react';
import { Box, Typography, Card, CardContent, Button, useTheme } from '@mui/material';
import { FileDownload, Assessment, VerifiedUser, Business, Warning } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { exportToCSV, exportToPDF, exportToExcel } from '../../services/exportUtils';
import { formatCurrency } from '../../services/formatUtils';

const Reports = () => {
  const procurements = useSelector((state) => state.procurement.items);
  const vendors = useSelector((state) => state.vendors.items);
  const risks = useSelector((state) => state.risk.items);
  const compliances = useSelector((state) => state.compliance.items);
  const audits = useSelector((state) => state.audit.items);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  const handleExport = (type, reportType) => {
    let data = [];
    let title = '';
    let columns = [];

    switch (reportType) {
      case 'Audit':
        data = audits;
        title = 'System Audit Logs';
        columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'userId', headerName: 'User ID', width: 120 },
          { field: 'action', headerName: 'Action', width: 150 },
          { field: 'details', headerName: 'Details', width: 250 },
          { field: 'timestamp', headerName: 'Timestamp', width: 180 },
        ];
        break;
      case 'Procurement':
        data = procurements.map(p => ({
          ...p,
          amount: formatCurrency(p.amount)
        }));
        title = 'Global Procurement Summary';
        columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'title', headerName: 'Title', width: 200 },
          { field: 'department', headerName: 'Department', width: 130 },
          { field: 'amount', headerName: 'Amount', width: 130 },
          { field: 'status', headerName: 'Status', width: 160 },
        ];
        break;
      case 'Vendor':
        data = vendors;
        title = 'Vendor Performance & Risk Matrix';
        columns = [
          { field: 'name', headerName: 'Vendor Name', width: 200 },
          { field: 'category', headerName: 'Category', width: 150 },
          { field: 'riskLevel', headerName: 'Risk Level', width: 130 },
          { field: 'status', headerName: 'Status', width: 140 },
          { field: 'rating', headerName: 'Performance', width: 160 },
        ];
        break;
      case 'Risk':
        data = risks;
        title = 'Enterprise Risk Register';
        columns = [
          { field: 'title', headerName: 'Risk Title', width: 200 },
          { field: 'category', headerName: 'Category', width: 150 },
          { field: 'level', headerName: 'Level', width: 130 },
          { field: 'status', headerName: 'Status', width: 140 },
          { field: 'impact', headerName: 'Impact', width: 130 },
        ];
        break;
      case 'Compliance':
        data = compliances;
        title = 'Compliance Logs';
        columns = [
          { field: 'title', headerName: 'Certification / Policy', width: 200 },
          { field: 'type', headerName: 'Type', width: 150 },
          { field: 'status', headerName: 'Status', width: 150 },
          { field: 'expirationDate', headerName: 'Expiration Date', width: 180 },
        ];
        break;
    }

    if (type === 'csv') {
      exportToCSV(data, title.replace(/ /g, '_'), title, columns);
    } else if (type === 'excel') {
      exportToExcel(data, title.replace(/ /g, '_'), title, columns);
    } else {
      exportToPDF(data, title.replace(/ /g, '_'), title, columns);
    }
  };

  const reportsList = [
    { type: 'Procurement', roles: ['Manager', 'Administrator'], title: 'Global Procurement Summary', desc: 'Comprehensive report of all procurement requests, spending, and approval times.', icon: <Assessment sx={{ fontSize: 32, color: theme.palette.primary.main }} />, color: theme.palette.primary.main },
    { type: 'Vendor', roles: ['Manager', 'Administrator'], title: 'Vendor Performance & Risk Matrix', desc: 'Detailed analysis of active vendors, their ratings, and associated risks.', icon: <Business sx={{ fontSize: 32, color: theme.palette.secondary.main }} />, color: theme.palette.secondary.main },
    { type: 'Risk', roles: ['Compliance Officer', 'Administrator'], title: 'Enterprise Risk Register', desc: 'Export of all identified risks across departments, including likelihood and impact.', icon: <Warning sx={{ fontSize: 32, color: theme.palette.error.main }} />, color: theme.palette.error.main },
    { type: 'Compliance', roles: ['Compliance Officer', 'Administrator'], title: 'Compliance Violation Logs', desc: 'Audit trail of expired certifications and non-compliant vendors.', icon: <VerifiedUser sx={{ fontSize: 32, color: theme.palette.success.main }} />, color: theme.palette.success.main },
    { type: 'Audit', roles: ['Auditor', 'Administrator'], title: 'System Audit Logs', desc: 'Comprehensive log of system activities, logins, and data modifications.', icon: <Assessment sx={{ fontSize: 32, color: theme.palette.info.main }} />, color: theme.palette.info.main },
  ].filter(report => report.roles.includes(user?.role));

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>Report Generation Center</Typography>
          <Typography variant="body1" color="text.secondary">Export detailed system reports in CSV or PDF format.</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {reportsList.map((report, idx) => (
          <Card key={idx} elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}`, borderRadius: 3, transition: 'all 0.2s', '&:hover': { borderColor: report.color, boxShadow: `0 4px 20px ${report.color}1A`, transform: 'translateY(-2px)' } }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, alignItems: 'flex-start', p: { xs: 2.5, sm: 4 } }}>
              <Box sx={{ p: 2, bgcolor: `${report.color}15`, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', selfAlign: { xs: 'flex-start', sm: 'center' } }}>
                {report.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, letterSpacing: '-0.01em', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>{report.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{report.desc}</Typography>
              </Box>
            </CardContent>
            <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: { xs: 2.5, sm: 4 }, pt: 0, display: 'flex', justifyContent: 'flex-end', gap: 1.5, flexWrap: 'wrap' }}>
              <Button size="small" variant="outlined" startIcon={<FileDownload />} onClick={() => handleExport('csv', report.type)} sx={{ flexGrow: { xs: 1, sm: 0 } }}>CSV</Button>
              <Button size="small" variant="outlined" startIcon={<FileDownload />} onClick={() => handleExport('excel', report.type)} sx={{ flexGrow: { xs: 1, sm: 0 } }}>Excel</Button>
              <Button size="small" variant="contained" startIcon={<FileDownload />} onClick={() => handleExport('pdf', report.type)} sx={{ flexGrow: { xs: 1, sm: 0 }, bgcolor: report.color, '&:hover': { bgcolor: report.color, filter: 'brightness(0.9)' } }}>PDF</Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Reports;
