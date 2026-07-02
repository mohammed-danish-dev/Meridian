import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider, Tabs, Tab, Chip, Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme, Paper } from '@mui/material';
import { Description, Security, GridOn, ListAlt, InsertDriveFile, CloudDownload, CloudUpload, Warning, CheckCircle, Person } from '@mui/icons-material';
import { formatDateInTimezone } from '../../services/dateUtils';
import { useSelector } from 'react-redux';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`risk-details-tabpanel-${index}`} aria-labelledby={`risk-details-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const RiskDetailsDialog = ({ open, onClose, risk }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [documents, setDocuments] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return theme.palette.error.main;
      case 'High': return theme.palette.warning.main;
      case 'Medium': return theme.palette.primary.main;
      default: return theme.palette.success.main;
    }
  };

  const initialDocs = useMemo(() => {
    if (!risk) return [];
    return [
      { id: 'risk-doc-1', name: 'Business_Continuity_Disaster_Recovery_Plan.pdf', type: 'Mitigation Plan', size: '2.5 MB', date: risk.createdAt || new Date().toISOString() },
      { id: 'risk-doc-2', name: 'Qualitative_Risk_Impact_Analysis.xlsx', type: 'Risk Analysis', size: '1.2 MB', date: risk.createdAt || new Date().toISOString() }
    ];
  }, [risk]);

  const currentDocs = useMemo(() => {
    if (!risk) return [];
    const uploaded = documents[risk.id] || [];
    return [...initialDocs, ...uploaded];
  }, [risk, documents, initialDocs]);

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0 || !risk) return;
    const file = e.target.files[0];
    const newDoc = {
      id: `new-rd-${Date.now()}`,
      name: file.name,
      type: 'Mitigation Resource',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString()
    };
    setDocuments({
      ...documents,
      [risk.id]: [...(documents[risk.id] || []), newDoc]
    });
  };

  if (!risk) return null;
  const renderRiskMatrix = () => {
    const impact = risk.impact || 3;
    const likelihood = risk.likelihood || 3;

    return (
      <Box sx={{ mt: 2, overflowX: 'auto', width: '100%', pb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Matrix position: Likelihood ({likelihood}/5) x Impact ({impact}/5)
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, minWidth: 420, maxWidth: 450, mx: 'auto', mt: 3, position: 'relative' }}>
<Box sx={{ gridRow: '1 / 6', gridColumn: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
              LIKELIHOOD
            </Typography>
          </Box>
{Array.from({ length: 5 }, (_, yIndex) => {
            const y = 5 - yIndex;
            return (
              <React.Fragment key={`row-${y}`}>
                {Array.from({ length: 5 }, (_, xIndex) => {
                  const x = xIndex + 1;
                  const isCurrent = x === impact && y === likelihood;
                  const severity = x * y;
                  let bg = '#E2E8F0';
                  let textColor = '#475569';
                  if (severity >= 15) {
                    bg = '#FEE2E2';
                    textColor = '#EF4444';
                  } else if (severity >= 9) {
                    bg = '#FEF3C7';
                    textColor = '#F59E0B';
                  } else if (severity >= 4) {
                    bg = '#DBEAFE';
                    textColor = '#3B82F6';
                  } else {
                    bg = '#DCFCE7';
                    textColor = '#10B981';
                  }

                  return (
                    <Box 
                      key={`cell-${x}-${y}`} 
                      sx={{ 
                        height: 55, 
                        bgcolor: isCurrent ? getRiskColor(risk.level) : bg, 
                        color: isCurrent ? '#FFF' : textColor,
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        borderRadius: 1,
                        border: isCurrent ? '3px solid #FFF' : '1px solid transparent',
                        boxShadow: isCurrent ? theme.shadows[6] : 'none',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 800 }}>
                        {x},{y}
                      </Typography>
                      {isCurrent && (
                        <Box sx={{ 
                          position: 'absolute', 
                          top: -4, 
                          right: -4, 
                          width: 10, 
                          height: 10, 
                          borderRadius: '50%', 
                          bgcolor: 'common.white', 
                          border: `2px solid ${getRiskColor(risk.level)}`,
                          animation: 'pulse 1.5s infinite' 
                        }} />
                      )}
                    </Box>
                  );
                })}
              </React.Fragment>
            );
          })}
<Box />
{Array.from({ length: 5 }, (_, idx) => (
            <Typography key={`x-label-${idx}`} variant="caption" sx={{ textAlign: 'center', fontWeight: 700, mt: 1 }}>
              I{idx + 1}
            </Typography>
          ))}
<Box sx={{ gridColumn: '2 / 7', textAlign: 'center', mt: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              IMPACT (1-5)
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

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
          <Avatar sx={{ bgcolor: `${getRiskColor(risk.level)}15`, color: getRiskColor(risk.level), width: 56, height: 56, borderRadius: 2 }}>
            <Warning fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              {risk.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Risk ID: {risk.id}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={`Status: ${risk.status}`} color={risk.status === 'Open' ? 'error' : 'success'} variant="outlined" sx={{ fontWeight: 700 }} />
          <Chip label={`Severity: ${risk.level}`} sx={{ bgcolor: getRiskColor(risk.level), color: '#FFF', fontWeight: 700 }} />
        </Box>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2.5, sm: 4 } }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="risk registry tabs" variant="scrollable" scrollButtons="auto">
          <Tab icon={<Description sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Overview" />
          <Tab icon={<GridOn sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Risk Matrix" />
          <Tab icon={<ListAlt sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Mitigation Plan" />
          <Tab icon={<InsertDriveFile sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Document Management" />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: 3, minHeight: 350 }}>
<CustomTabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Risk Category</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{risk.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Identified Date</Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDateInTimezone(risk.createdAt || new Date().toISOString(), 'MMMM dd, yyyy')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Likelihood score</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{risk.likelihood || 3} / 5</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Impact score</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{risk.impact || 3} / 5</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Detailed Description</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {risk.description || 'This risk relates to general business compliance operations and business continuity processes requiring active tracking and reporting.'}
              </Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={1}>
          {renderRiskMatrix()}
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Mitigation Strategy & Active Controls</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={0} sx={{ p: 2.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle fontSize="small" color="success" /> Short-Term Action Items
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                1. Conduct security training workshops for all personnel involved in vendor onboarding.<br />
                2. Refresh API credentials and run compliance audits on all software suites.
              </Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security fontSize="small" color="primary" /> Long-Term Mitigation Plan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Establish fully automated SLA tracking systems with predictive analytics to flag risk anomalies before they escalate to critical status.
              </Typography>
            </Paper>
          </Box>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Risk Evidence & Response Documents</Typography>
            <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ borderRadius: 2 }}>
              Upload Resource
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
        <Button onClick={onClose} variant="contained" sx={{ px: 4 }}>Close Details</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RiskDetailsDialog;
