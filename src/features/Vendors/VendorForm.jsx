import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addVendor, updateVendor } from '../../store/slices/vendorSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object({
  name: yup.string().required('Vendor name is required'),
  category: yup.string().required('Category is required'),
  contactEmail: yup.string().email('Invalid email').required('Contact email is required'),
  riskLevel: yup.string().required('Risk level is required'),
}).required();

const VendorForm = ({ open, onClose, vendorToEdit }) => {
  const dispatch = useDispatch();
  
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', category: '', contactEmail: '', riskLevel: 'Low' }
  });

  useEffect(() => {
    if (vendorToEdit) {
      reset({
        name: vendorToEdit.name,
        category: vendorToEdit.category,
        contactEmail: vendorToEdit.contactEmail,
        riskLevel: vendorToEdit.riskLevel,
      });
    } else {
      reset({ name: '', category: '', contactEmail: '', riskLevel: 'Low' });
    }
  }, [vendorToEdit, open, reset]);

  const onSubmit = (data) => {
    if (vendorToEdit) {
      dispatch(updateVendor({ ...vendorToEdit, ...data }));
    } else {
      const newVendor = {
        id: uuidv4(),
        ...data,
        status: 'Under Review',
        spendYTD: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
      };
      dispatch(addVendor(newVendor));
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
          {vendorToEdit ? 'Edit Vendor Profile' : 'Onboard New Vendor'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Enter the supplier's corporate details for evaluation.
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box component="form" id="vendor-form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller name="name" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Vendor Name" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="e.g., Acme Corporation" />
          )} />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Controller name="category" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Category" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Hardware">Hardware</MenuItem>
                <MenuItem value="Services">Services</MenuItem>
                <MenuItem value="Consulting">Consulting</MenuItem>
              </TextField>
            )} />
            <Controller name="riskLevel" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Initial Risk Level" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            )} />
          </Box>
          <Controller name="contactEmail" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} type="email" label="Contact Email" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="contact@vendor.com" />
          )} />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
        <Button type="submit" form="vendor-form" variant="contained" sx={{ px: 4, py: 1 }}>
          {vendorToEdit ? 'Save Changes' : 'Submit Vendor'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VendorForm;
