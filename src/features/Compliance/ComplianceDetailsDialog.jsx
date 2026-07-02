import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider, Tabs, Tab, Chip, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { Description, VerifiedUser, CheckBox, InsertDriveFile, CloudDownload, CloudUpload, History, FactCheck } from '@mui/icons-material';
import { formatDateInTimezone } from '../../services/dateUtils';
import { useSelector } from 'react-redux';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`comp-details-tabpanel-${index}`} aria-labelledby={`comp-details-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ComplianceDetailsDialog = ({ open, onClose, compliance }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [checklist, setChecklist] = useState({});
  const [documents, setDocuments] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'success';
      case 'Expired': return 'error';
      default: return 'warning';
    }
  };

  const requirements = useMemo(() => {
    if (!compliance) return [];
    return [
      { id: 'req-1', title: 'Formal Security Policy & Document Review', desc: 'Verify the policy matches our latest ISO guidelines.' },
      { id: 'req-2', title: 'Staff Training & Awareness Verification', desc: 'Confirm at least 95% of staff completed cybersecurity training.' },
      { id: 'req-3', title: 'Technical Vulnerability Penetration Test', desc: 'Annual external pentest reports analyzed and approved.' },
      { id: 'req-4', title: 'Executive Management Sign-off', desc: 'Formal signature and board approval on record.' }
    ];
  }, [compliance]);

  const initialDocs = useMemo(() => {
    if (!compliance) return [];
    return [
      { id: 'comp-doc-1', name: 'Regulatory_Compliance_Certificate.pdf', type: 'Certificate', size: '1.8 MB', date: compliance.expirationDate },
      { id: 'comp-doc-2', name: 'Internal_Audit_Findings_Report.xlsx', type: 'Self-Assessment', size: '3.1 MB', date: compliance.expirationDate }
    ];
  }, [compliance]);

  const currentDocs = useMemo(() => {
    if (!compliance) return [];
    const uploaded = documents[compliance.id] || [];
    return [...initialDocs, ...uploaded];
  }, [compliance, documents, initialDocs]);

  const auditTrail = useMemo(() => {
    if (!compliance) return [];
    return [
      { timestamp: compliance.expirationDate, event: 'Certificate Verification Passed', operator: 'Compliance Officer', description: 'All requirement evidence audited and validated successfully.' },
      { timestamp: compliance.expirationDate, event: 'Annual Certificate Submitted', operator: 'System', description: 'New document submitted for review.' }
    ];
  }, [compliance]);

  const handleCheckChange = (reqId) => {
    if (!compliance) return;
    const key = `${compliance.id}-${reqId}`;
    setChecklist({
      ...checklist,
      [key]: !checklist[key]
    });
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0 || !compliance) return;
    const file = e.target.files[0];
    const newDoc = {
      id: `new-cd-${Date.now()}`,
      name: file.name,
      type: 'Compliance Audit Evidence',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString()
    };
    setDocuments({
      ...documents,
      [compliance.id]: [...(documents[compliance.id] || []), newDoc]
    });
  };

  if (!compliance) return null;

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
          <Avatar sx={{ bgcolor: `${theme.palette.success.main}15`, color: 'success.main', width: 56, height: 56, borderRadius: 2 }}>
            <VerifiedUser fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              {compliance.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Record ID: {compliance.id}
            </Typography>
          </Box>
        </Box>
        <Chip label={compliance.status} color={getStatusColor(compliance.status)} sx={{ fontWeight: 700 }} />
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2.5, sm: 4 } }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="compliance details tabs" variant="scrollable" scrollButtons="auto">
          <Tab icon={<Description sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Overview" />
          <Tab icon={<FactCheck sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Requirements Checklist" />
          <Tab icon={<InsertDriveFile sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Document Management" />
          <Tab icon={<History sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Audit Trail" />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: 3, minHeight: 350 }}>
<CustomTabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Compliance Type</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{compliance.type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Expiration Date</Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDateInTimezone(compliance.expirationDate, 'MMMM dd, yyyy')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Requirements Summary</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                This record manages the regulatory framework and operational checklist required to maintain active "{compliance.title}" standing in compliance with the enterprise security, legal, and operational policies.
              </Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Standard Operational Checklist</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {requirements.map((req) => {
              const checked = !!checklist[`${compliance.id}-${req.id}`] || compliance.status === 'Compliant';
              return (
                <Paper key={req.id} elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={checked} 
                        onChange={() => handleCheckChange(req.id)}
                        disabled={compliance.status === 'Compliant'}
                        color="success" 
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, textDecoration: checked ? 'line-through' : 'none', color: checked ? 'text.secondary' : 'text.primary' }}>
                          {req.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {req.desc}
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              );
            })}
          </Box>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Compliance Attestations & Evidence</Typography>
            <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ borderRadius: 2 }}>
              Upload Attestation
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
                        {doc.size} • Type: {doc.type} • Expiry/Date: {formatDateInTimezone(doc.date, 'MMM dd, yyyy')}
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
<CustomTabPanel value={tabValue} index={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Certification Lifecycle Logs</Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {auditTrail.map((log, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>{log.event}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Operator: {log.operator} • Time: {formatDateInTimezone(log.timestamp, 'yyyy-MM-01 10:00:00')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{log.description}</Typography>
              </Paper>
            ))}
          </List>
        </CustomTabPanel>
      </DialogContent>
      
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} variant="contained" sx={{ px: 4 }}>Close Details</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplianceDetailsDialog;
