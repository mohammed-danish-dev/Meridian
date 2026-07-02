import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addRisk, updateRisk } from '../../store/slices/riskSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  category: yup.string().required('Category is required'),
  level: yup.string().required('Level is required'),
  impact: yup.number().min(1).max(5).required(),
  likelihood: yup.number().min(1).max(5).required(),
  status: yup.string().required(),
}).required();

const RiskForm = ({ open, onClose, riskToEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', category: '', level: 'Low', impact: 1, likelihood: 1, status: 'Open' }
  });

  useEffect(() => {
    if (riskToEdit) {
      reset({
        title: riskToEdit.title,
        category: riskToEdit.category,
        level: riskToEdit.level,
        impact: riskToEdit.impact,
        likelihood: riskToEdit.likelihood,
        status: riskToEdit.status,
      });
    } else {
      reset({ title: '', category: '', level: 'Low', impact: 1, likelihood: 1, status: 'Open' });
    }
  }, [riskToEdit, open, reset]);

  const onSubmit = (data) => {
    if (riskToEdit) {
      dispatch(updateRisk({ ...riskToEdit, ...data }));
    } else {
      const newRisk = {
        id: uuidv4(),
        ...data,
        ownerId: user?.id || 'sys',
        createdAt: new Date().toISOString(),
      };
      dispatch(addRisk(newRisk));
    }
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      slotProps={{ paper: {
        elevation: 0,
        sx: { borderRadius: 3, border: '1px solid', borderColor: 'divider', m: { xs: 1.5, sm: 3 } }
      } }}
    >
      <DialogTitle sx={{ pb: 2, pt: 3, px: { xs: 2.5, sm: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {riskToEdit ? 'Edit Risk Record' : 'Log New Risk'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Document and categorize potential enterprise risks.
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box component="form" id="risk-form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller name="title" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Risk Title" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="e.g., Data Breach Vulnerability" />
          )} />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Controller name="category" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Category" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Security">Security</MenuItem>
                <MenuItem value="Financial">Financial</MenuItem>
                <MenuItem value="Operational">Operational</MenuItem>
                <MenuItem value="Compliance">Compliance</MenuItem>
              </TextField>
            )} />
            <Controller name="level" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Risk Level" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            )} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Controller name="impact" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} type="number" label="Impact (1-5)" fullWidth error={!!error} helperText={error?.message} slotProps={{ htmlInput: { min: 1, max: 5 }, inputLabel: { shrink: true } }} />
            )} />
            <Controller name="likelihood" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} type="number" label="Likelihood (1-5)" fullWidth error={!!error} helperText={error?.message} slotProps={{ htmlInput: { min: 1, max: 5 }, inputLabel: { shrink: true } }} />
            )} />
          </Box>
          <Controller name="status" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} select label="Status" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Mitigated">Mitigated</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </TextField>
          )} />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
        <Button type="submit" form="risk-form" variant="contained" sx={{ px: 4, py: 1 }}>
          {riskToEdit ? 'Save Changes' : 'Submit Risk'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RiskForm;
