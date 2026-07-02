import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, updateRequest } from '../../store/slices/procurementSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  amount: yup.number().positive('Must be positive').required('Amount is required'),
  currency: yup.string().required('Currency is required'),
  department: yup.string().required('Department is required'),
}).required();

const ProcurementForm = ({ open, onClose, requestToEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '', amount: 0, currency: 'INR', department: '' }
  });

  useEffect(() => {
    if (requestToEdit) {
      reset({
        title: requestToEdit.title,
        description: requestToEdit.description,
        amount: requestToEdit.amount,
        currency: requestToEdit.currency,
        department: requestToEdit.department,
      });
    } else {
      reset({ title: '', description: '', amount: 0, currency: 'INR', department: user?.department || '' });
    }
  }, [requestToEdit, open, reset, user]);

  const onSubmit = (data) => {
    if (requestToEdit) {
      dispatch(updateRequest({ ...requestToEdit, ...data, updatedAt: new Date().toISOString() }));
    } else {
      const newReq = {
        id: uuidv4(),
        ...data,
        requesterId: user?.id || 'sys',
        status: 'Pending Approval',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addRequest(newReq));
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
          {requestToEdit ? 'Edit Request' : 'New Procurement Request'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Fill in the details below to submit a purchase request.
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box component="form" id="procurement-form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller name="title" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Request Title" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="e.g., Enterprise Software License" />
          )} />
          <Controller name="department" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} select label="Department" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
              <MenuItem value="IT">Information Technology</MenuItem>
              <MenuItem value="HR">Human Resources</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
            </TextField>
          )} />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Controller name="amount" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} type="number" label="Amount" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="0.00" />
            )} />
            <Controller name="currency" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Currency" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="INR">INR (₹)</MenuItem>
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
              </TextField>
            )} />
          </Box>
          <Controller name="description" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Business Justification" fullWidth multiline rows={4} error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="Provide detailed justification for this request..." />
          )} />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
        <Button type="submit" form="procurement-form" variant="contained" sx={{ px: 4, py: 1 }}>
          {requestToEdit ? 'Save Changes' : 'Submit Request'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProcurementForm;
