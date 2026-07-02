import React, { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Box, Typography, Divider, Tabs, Tab, Chip, Avatar, TextField, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import { Description, AttachFile, History, Comment, ListAlt, Send, CloudDownload, Person } from '@mui/icons-material';
import { formatCurrency } from '../../services/formatUtils';
import { formatDateInTimezone } from '../../services/dateUtils';
import { useSelector } from 'react-redux';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`proc-details-tabpanel-${index}`} aria-labelledby={`proc-details-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ProcurementDetailsDialog = ({ open, onClose, request }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState({});
  const [newCommentText, setNewCommentText] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending Approval': return 'warning';
      case 'Rejected': return 'error';
      case 'Draft': return 'default';
      default: return 'primary';
    }
  };
  const attachments = useMemo(() => {
    if (!request) return [];
    return [
      { id: 'att-1', name: 'Business_Case_Justification.pdf', size: '1.2 MB', date: request.createdAt, category: 'Business Case' },
      { id: 'att-2', name: 'Vendor_Price_Quote.xlsx', size: '450 KB', date: request.createdAt, category: 'Financials' },
      { id: 'att-3', name: 'Technical_Requirements_Spec.docx', size: '2.1 MB', date: request.createdAt, category: 'Technical' }
    ];
  }, [request]);

  const approvalHistory = useMemo(() => {
    if (!request) return [];
    const history = [
      { step: 'Request Submitted', user: 'Requester', date: request.createdAt, status: 'Completed', note: 'Initial procurement request created.' }
    ];
    if (request.status === 'Pending Approval') {
      history.push({ step: 'Manager Approval', user: 'Manager', date: null, status: 'Pending', note: 'Awaiting manager review and sign-off.' });
    } else if (request.status === 'Approved') {
      history.push(
        { step: 'Manager Approval', user: 'Manager', date: request.updatedAt, status: 'Approved', note: 'Request reviewed and approved.' },
        { step: 'Procurement Finalized', user: 'System', date: request.updatedAt, status: 'Completed', note: 'Purchase order generated successfully.' }
      );
    } else if (request.status === 'Rejected') {
      history.push({ step: 'Manager Approval', user: 'Manager', date: request.updatedAt, status: 'Rejected', note: 'Budget limit exceeded. Please revise.' });
    }
    return history;
  }, [request]);

  const auditLogs = useMemo(() => {
    if (!request) return [];
    const logs = [
      { timestamp: request.createdAt, event: 'Record Created', user: 'System', description: `Procurement request was submitted with ID ${request.id}.` }
    ];
    if (request.updatedAt !== request.createdAt) {
      logs.unshift({ timestamp: request.updatedAt, event: 'Record Updated', user: 'Manager', description: `Status updated to "${request.status}".` });
    }
    return logs;
  }, [request]);

  const currentComments = useMemo(() => {
    if (!request) return [];
    const saved = comments[request.id] || [];
    const initial = [
      { id: 'c-1', user: 'Alice Smith', role: 'Employee', date: request.createdAt, text: 'This purchase is critical for our Q3 project roadmap.' }
    ];
    if (request.status === 'Rejected') {
      initial.push({ id: 'c-2', user: 'Bob Jones', role: 'Manager', date: request.updatedAt, text: 'We do not have enough remaining budget in this category. Re-submit next month.' });
    }
    return [...initial, ...saved];
  }, [request, comments]);

  const handleAddComment = () => {
    if (!newCommentText.trim() || !request) return;
    const newComment = {
      id: `new-c-${Date.now()}`,
      user: user?.name || 'Anonymous',
      role: user?.role || 'Staff',
      date: new Date().toISOString(),
      text: newCommentText.trim()
    };
    setComments({
      ...comments,
      [request.id]: [...(comments[request.id] || []), newComment]
    });
    setNewCommentText('');
  };

  if (!request) return null;

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
      <DialogTitle sx={{ pb: 1, pt: 3, px: { xs: 2.5, sm: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Procurement Details
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {request.id}
          </Typography>
        </Box>
        <Chip label={request.status} color={getStatusColor(request.status)} size="small" sx={{ fontWeight: 700 }} />
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 2.5, sm: 4 } }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="procurement details tabs" variant="scrollable" scrollButtons="auto">
          <Tab icon={<Description sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Overview" />
          <Tab icon={<AttachFile sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Attachments" />
          <Tab icon={<History sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Approval History" />
          <Tab icon={<Comment sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Comments" />
          <Tab icon={<ListAlt sx={{ fontSize: '1.2rem' }} />} iconPosition="start" label="Audit Logs" />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: 3, minHeight: 350 }}>
<CustomTabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2.5, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Title</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{request.title}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Department</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>{request.department}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Amount</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5, color: theme.palette.primary.main }}>{formatCurrency(request.amount)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Submitted Date</Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDateInTimezone(request.createdAt, 'MMMM dd, yyyy')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Last Updated</Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>{formatDateInTimezone(request.updatedAt, 'MMMM dd, yyyy HH:mm:ss')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Business Justification</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{request.description || 'No description provided.'}</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Submitted Attachments</Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {attachments.map((att) => (
              <Paper key={att.id} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <ListItem sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, p: 2 }}>
                  <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: `${theme.palette.primary.main}15`, color: 'primary.main' }}>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={att.name} 
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {att.size} • Category: {att.category} • Uploaded: {formatDateInTimezone(att.date, 'MMM dd, yyyy')}
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
<CustomTabPanel value={tabValue} index={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Workflow Steps</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl: 2, borderLeft: `2px solid ${theme.palette.divider}` }}>
            {approvalHistory.map((step, idx) => (
              <Box key={idx} sx={{ position: 'relative' }}>
                <Box sx={{ 
                  position: 'absolute', 
                  left: -25, 
                  top: 2, 
                  width: 14, 
                  height: 14, 
                  borderRadius: '50%', 
                  bgcolor: step.status === 'Approved' || step.status === 'Completed' ? theme.palette.success.main : (step.status === 'Pending' ? theme.palette.warning.main : theme.palette.error.main),
                  border: `2px solid ${theme.palette.background.paper}`
                }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{step.step}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Role: {step.user} {step.date ? `• ${formatDateInTimezone(step.date, 'MMM dd, yyyy HH:mm')}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>{step.note}</Typography>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Discussion Thread</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Post a comment..." 
              value={newCommentText} 
              onChange={(e) => setNewCommentText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <Button variant="contained" onClick={handleAddComment} sx={{ borderRadius: 2 }}>
              <Send fontSize="small" />
            </Button>
          </Box>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {currentComments.map((comment) => (
              <Paper key={comment.id} elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <ListItem alignItems="flex-start" sx={{ p: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {comment.user} <Chip label={comment.role} size="small" sx={{ fontSize: '0.7rem', height: 18, ml: 1, fontWeight: 600 }} />
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDateInTimezone(comment.date, 'MMM dd, yyyy HH:mm')}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                        {comment.text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </CustomTabPanel>
<CustomTabPanel value={tabValue} index={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Event Logs</Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {auditLogs.map((log, idx) => (
              <Paper key={idx} elevation={0} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>{log.event}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Operator: {log.user} • Time: {formatDateInTimezone(log.timestamp, 'yyyy-MM-dd HH:mm:ss')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{log.description}</Typography>
              </Paper>
            ))}
          </List>
        </CustomTabPanel>
      </DialogContent>
      
      <Divider />
      <DialogActions sx={{ p: 3, px: 4 }}>
        <Button onClick={onClose} variant="contained" sx={{ px: 4 }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProcurementDetailsDialog;
