import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Alert, CircularProgress, useTheme, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Business, EmailOutlined, ArrowBack } from '@mui/icons-material';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
}).required();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0B0F19', p: 2, position: 'relative' }}>
      <Button 
        variant="text" 
        color="inherit" 
        onClick={() => navigate('/login')} 
        sx={{ position: 'absolute', top: 24, left: 24, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <ArrowBack fontSize="small" /> Back to Login
      </Button>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Business sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
            Meridian
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
            Enterprise Platform
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[4] }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Enter your enterprise email address, and we will send you a secure link to reset your password.
          </Typography>

          {success ? (
            <Box>
              <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
                A password recovery email has been sent to <strong>{getValues('email')}</strong>. Please check your inbox and follow instructions.
              </Alert>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate(`/reset-password?email=${encodeURIComponent(getValues('email'))}`)}
                sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
              >
                Go to Reset Password
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Enterprise Email Address"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlined color="action" />
                          </InputAdornment>
                        ),
                      }
                    }}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, letterSpacing: '0.02em', borderRadius: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Recovery Link'}
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
