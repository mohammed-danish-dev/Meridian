import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Alert, CircularProgress, useTheme, InputAdornment, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateUserPassword } from '../../store/slices/authSlice';
import { Business, LockOutlined, Visibility, VisibilityOff, ArrowBack, EmailOutlined } from '@mui/icons-material';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
}).required();

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(updateUserPassword({ email: data.email, newPassword: data.password }));
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
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Create a strong, new password for your enterprise credentials.
          </Typography>

          {success ? (
            <Box>
              <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
                Your password has been successfully reset! You can now use your new password to sign in.
              </Alert>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate('/login')}
                sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
              >
                Proceed to Sign In
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
                    sx={{ mb: 2 }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined color="action" />
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
