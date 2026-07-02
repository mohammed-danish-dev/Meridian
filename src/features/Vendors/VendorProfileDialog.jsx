import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider, Tabs, Tab, Chip, Avatar, Rating, TextField, List, ListItem, ListItemAvatar, ListItemText, useTheme, LinearProgress, Paper } from '@mui/material';
import { Business, VerifiedUser, Security, Star, InsertDriveFile, CloudDownload, CloudUpload, Mail, DateRange, AttachMoney } from '@mui/icons-material';
import { formatCurrency } from '../../services/formatUtils';
import { formatDateInTimezone } from '../../services/dateUtils';
import { useSelector } from 'react-redux';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`vendor-profile-tabpanel-${index}`} aria-labelledby={`vendor-profile-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const VendorProfileDialog = ({ open, onClose, vendor }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [documents, setDocuments] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'primary';
      default: return 'success';
    }
  };
  const initialDocs = useMemo(() => {
    if (!vendor) return [];
    return [
      { id: 'doc-1', name: 'Master_Services_Agreement_2026.pdf', type: 'SLA', size: '1.4 MB', date: vendor.createdAt || new Date().toISOString() },
      { id: 'doc-2', name: 'Vendor_Security_Assessment_V3.pdf', type: 'Risk Audit', size: '2.8 MB', date: vendor.createdAt || new Date().toISOString() },
      { id: 'doc-3', name: 'Certificate_of_Insurance.pdf', type: 'Insurance', size: '890 KB', date: vendor.createdAt || new Date().toISOString() }
    ];
  }, [vendor]);

  const currentDocs = useMemo(() => {
    if (!vendor) return [];
    const uploaded = documents[vendor.id] || [];
    return [...initialDocs, ...uploaded];
  }, [vendor, documents, initialDocs]);

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0 || !vendor) return;
    const file = e.target.files[0];
    const newDoc = {
      id: `new-doc-${Date.now()}`,
      name: file.name,
      type: 'User Upload',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString()
    };
    setDocuments({
      ...documents,
      [vendor.id]: [...(documents[vendor.id] || []), newDoc]
    });
  };

  if (!vendor) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      slotProps={{ paper: {
        elevation: 0,
        sx: { borderRadius: 3, border: '1px solid', borderColor: 'divider', m: { xs: 1.5, sm: 3 } }
      } }}
    >
      <DialogTitle sx={{ pb: 1, pt: 3, px: { xs: 2.5, sm: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Avatar sx={{ bgcolor: `${theme.palette.primary.main}15`, color: 'primary.main', width: 56, height: 56, borderRadius: 2 }}>
            <Business fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              {vendor.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Vendor ID: {vendor.id}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={vendor.status} color={vendor.status === 'Active' ? 'success' : 'default'} variant="outlined" sx={{ fontWeight: 700 }} />
          <Chip label={`Risk: ${vendor.riskLevel || 'Low'}`} color={getRiskColor(vendor.riskLevel)} sx={{ fontWeight: 700 }} />
        </Box>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2.5, sm: 4 } }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="vendor profile tabs" variant="scrollable" scrollButtons="auto">
          <Tab icon={<Business sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Overview" />
          <Tab icon={<Security sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Risk Assessment" />
          <Tab icon={<Star sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Performance" />
          <Tab icon={<InsertDriveFile sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Document Management" />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: 3, minHeight: 350 }}>
<CustomTabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: `${theme.palette.primary.main}10`, color: 'primary.main' }}>
                  <Mail />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">Contact Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{vendor.contactEmail || `contact@${vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: `${theme.palette.success.main}10`, color: 'success.main' }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">Spend YTD</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>{formatCurrency(vendor.spendYTD || 0)}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Category</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{vendor.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Onboarding Date</Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDateInTimezone(vendor.createdAt || new Date().toISOString(), 'MMMM dd, yyyy')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>About {vendor.name}</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {vendor.name} is a leading provider of enterprise-grade {vendor.category.toLowerCase()} services and strategic business solutions. Onboarded to our vendor network to optimize operational workflows and deliver high-impact results.
              </Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Security & Compliance Risk Profile</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Cybersecurity Rating</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <LinearProgress variant="determinate" value={vendor.riskLevel === 'Low' ? 95 : vendor.riskLevel === 'Medium' ? 75 : vendor.riskLevel === 'High' ? 50 : 30} color={vendor.riskLevel === 'Low' || vendor.riskLevel === 'Medium' ? 'success' : 'warning'} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{vendor.riskLevel === 'Low' ? 'A+' : vendor.riskLevel === 'Medium' ? 'B' : vendor.riskLevel === 'High' ? 'C' : 'D'}</Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Data Privacy Compliance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <LinearProgress variant="determinate" value={vendor.riskLevel === 'Low' ? 98 : vendor.riskLevel === 'Medium' ? 85 : vendor.riskLevel === 'High' ? 60 : 40} color="success" sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>90%+</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedUser fontSize="small" color="primary" /> Risk Mitigation Notes
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  This vendor undergoes bi-annual security and compliance audits. Recommended action: Continue real-time transaction monitoring and periodic reviews of active service level agreements.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Supplier Scorecard</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <Paper elevation={0} sx={{ p: 3, border: `1px solid ${theme.palette.divider}`, borderRadius: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>{vendor.rating || '4.0'}</Typography>
                <Rating value={vendor.rating || 4.0} readOnly precision={0.5} sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">Overall Performance Score</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <span>Service Quality</span>
                    <span>4.5/5.0</span>
                  </Typography>
                  <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <span>On-time Delivery</span>
                    <span>4.2/5.0</span>
                  </Typography>
                  <LinearProgress variant="determinate" value={84} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <span>Billing Accuracy</span>
                    <span>4.8/5.0</span>
                  </Typography>
                  <LinearProgress variant="determinate" value={96} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Contractual Documents</Typography>
            <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ borderRadius: 2 }}>
              Upload Document
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
          </Box>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {currentDocs.map((doc) => (
              <Paper key={doc.id} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <ListItem sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, p: 2 }}>
                  <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: `${theme.palette.primary.main}15`, color: 'primary.main' }}>
                      <InsertDriveFile />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={doc.name} 
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {doc.size} • Type: {doc.type} • Added: {formatDateInTimezone(doc.date, 'MMM dd, yyyy')}
                      </Typography>
                    }
                    sx={{ width: '100%', mr: { sm: 10 } }}
                  />
                  <Button variant="outlined" size="small" startIcon={<CloudDownload />} sx={{ borderRadius: 2, alignSelf: { xs: 'flex-end', sm: 'center' }, minWidth: 110 }}>
                    Download
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </CustomTabPanel>
      </DialogContent>
      
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} variant="contained" sx={{ px: 4 }}>Close Profile</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VendorProfileDialog;
