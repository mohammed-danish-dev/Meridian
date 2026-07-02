import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCompliance, updateCompliance } from '../../store/slices/complianceSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  vendorId: yup.string().required('Vendor ID is required'),
  type: yup.string().required('Type is required'),
  status: yup.string().required('Status is required'),
  expirationDate: yup.string().required('Expiration date is required'),
}).required();

const ComplianceForm = ({ open, onClose, complianceToEdit }) => {
  const dispatch = useDispatch();
  
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', vendorId: '', type: 'Certification', status: 'Compliant', expirationDate: '' }
  });

  useEffect(() => {
    if (complianceToEdit) {
      reset({
        title: complianceToEdit.title,
        vendorId: complianceToEdit.vendorId,
        type: complianceToEdit.type,
        status: complianceToEdit.status,
        expirationDate: complianceToEdit.expirationDate.split('T')[0],
      });
    } else {
      reset({ title: '', vendorId: '', type: 'Certification', status: 'Compliant', expirationDate: '' });
    }
  }, [complianceToEdit, open, reset]);

  const onSubmit = (data) => {
    if (complianceToEdit) {
      dispatch(updateCompliance({ 
        ...complianceToEdit, 
        ...data,
        expirationDate: new Date(data.expirationDate).toISOString(),
      }));
    } else {
      const newCompliance = {
        id: uuidv4(),
        ...data,
        expirationDate: new Date(data.expirationDate).toISOString(),
      };
      dispatch(addCompliance(newCompliance));
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
          {complianceToEdit ? 'Edit Compliance Record' : 'Add Compliance Record'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Log new regulatory certifications and enterprise audits.
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Box component="form" id="compliance-form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller name="title" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Certification / Policy Title" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="e.g., ISO 27001 Certification" />
          )} />
          <Controller name="vendorId" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} label="Vendor ID" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }} placeholder="e.g., VEN-1234" />
          )} />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Controller name="type" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Type" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Certification">Certification</MenuItem>
                <MenuItem value="Audit">Audit</MenuItem>
                <MenuItem value="Policy">Policy</MenuItem>
              </TextField>
            )} />
            <Controller name="status" control={control} render={({ field, fieldState: { error } }) => (
              <TextField {...field} select label="Status" fullWidth error={!!error} helperText={error?.message} slotProps={{ inputLabel: { shrink: true } }}>
                <MenuItem value="Compliant">Compliant</MenuItem>
                <MenuItem value="Non-Compliant">Non-Compliant</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            )} />
          </Box>
          <Controller name="expirationDate" control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} type="date" label="Expiration Date" slotProps={{ inputLabel: { shrink: true } }} fullWidth error={!!error} helperText={error?.message} />
          )} />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3, px: { xs: 2.5, sm: 4 } }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
        <Button type="submit" form="compliance-form" variant="contained" sx={{ px: 4, py: 1 }}>
          {complianceToEdit ? 'Save Changes' : 'Submit Record'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplianceForm;
