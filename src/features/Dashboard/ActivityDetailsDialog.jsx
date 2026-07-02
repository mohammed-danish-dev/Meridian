import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Divider, Chip, Avatar, useTheme, alpha } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Close } from '@mui/icons-material';

const ActivityDetailsDialog = ({ open, onClose, activity }) => {
  const theme = useTheme();

  if (!activity) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: alpha(activity.color || theme.palette.primary.main, 0.1), color: activity.color || theme.palette.primary.main }}>
            {activity.icon}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{activity.title}</Typography>
            <Typography variant="caption" color="text.secondary">ID: {activity.id}</Typography>
          </Box>
        </Box>
        <Button onClick={onClose} sx={{ minWidth: 'auto', p: 1, color: 'text.secondary' }}>
          <Close />
        </Button>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Module</Typography>
              <Chip label={activity.module || 'System'} size="small" sx={{ borderRadius: 1, fontWeight: 600 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Status</Typography>
              <Chip label={activity.status || 'Completed'} size="small" sx={{ borderRadius: 1, fontWeight: 600, bgcolor: alpha(activity.color || theme.palette.success.main, 0.1), color: activity.color || theme.palette.success.main }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Date & Time</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.date} at {activity.time || '10:30 AM'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Priority</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.priority || 'Normal'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>User Name</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.userName || 'System Auto-Generated'}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>User Role</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.userRole || 'System'}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Description</Typography>
              <Typography variant="body2">{activity.longDesc || activity.desc || 'No description provided.'}</Typography>
            </Grid>
            
            {activity.previousStatus && (
              <Grid size={{ xs: 12 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Status Change</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={activity.previousStatus} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                  <Typography variant="body2" color="text.secondary">→</Typography>
                  <Chip label={activity.status} size="small" sx={{ borderRadius: 1, bgcolor: alpha(activity.color || theme.palette.success.main, 0.1), color: activity.color || theme.palette.success.main }} />
                </Box>
              </Grid>
            )}

            {activity.notes && (
              <Grid size={{ xs: 12 }}>
                <Box sx={{ p: 2, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Additional Notes</Typography>
                  <Typography variant="body2">{activity.notes}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider />

        <Box sx={{ p: 3, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A' }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Timeline Information</Typography>
          <Timeline sx={{ p: 0, m: 0, '& .MuiTimelineItem-root:before': { flex: 0, p: 0 } }}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="subtitle2" component="span">Action Executed</Typography>
                <Typography variant="body2" color="text.secondary">{activity.date} {activity.time || '10:30 AM'}</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="grey" variant="outlined" />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="subtitle2" component="span">Record Initialized</Typography>
                <Typography variant="body2" color="text.secondary">{activity.date} 09:00 AM</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Button onClick={onClose} variant="outlined" color="inherit">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetailsDialog;
