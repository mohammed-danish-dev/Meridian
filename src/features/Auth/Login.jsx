import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Alert, CircularProgress, Divider, useTheme, InputAdornment, IconButton, Card, CardContent, alpha } from '@mui/material';
import { motion } from 'motion/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mockLogin } from '../../store/slices/authSlice';
import { Business, Visibility, VisibilityOff, LockOutlined, EmailOutlined, Person, ShoppingCart, VerifiedUser, Assessment, AdminPanelSettings } from '@mui/icons-material';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const roleCards = [
  {
    roleName: 'Employee',
    displayName: 'Employee',
    email: 'employee@company.com',
    icon: <Person sx={{ fontSize: 32 }} />,
    description: 'Submit procurement requests, track order status, and view personal dashboard.'
  },
  {
    roleName: 'Procurement Manager',
    displayName: 'Procurement Manager',
    email: 'manager@company.com',
    icon: <ShoppingCart sx={{ fontSize: 32 }} />,
    description: 'Review and approve procurement orders, manage vendors, and analyze department budgets.'
  },
  {
    roleName: 'Compliance Officer',
    displayName: 'Compliance Officer',
    email: 'compliance@company.com',
    icon: <VerifiedUser sx={{ fontSize: 32 }} />,
    description: 'Audit vendor certifications, monitor compliance guidelines, and manage security risks.'
  },
  {
    roleName: 'Auditor',
    displayName: 'Auditor',
    email: 'auditor@company.com',
    icon: <Assessment sx={{ fontSize: 32 }} />,
    description: 'Examine complete system audit logs, track platform activity, and generate compliance reports.'
  },
  {
    roleName: 'Administrator',
    displayName: 'Administrator',
    email: 'admin@company.com',
    icon: <AdminPanelSettings sx={{ fontSize: 32 }} />,
    description: 'Full administrative controls to oversee users, system settings, and global risk management.'
  }
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();
  const theme = useTheme();
  const { error } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: 'password123' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(mockLogin(data.email, data.password));
      navigate('/dashboard');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0B0F19', 
      py: { xs: 6, md: 10 },
      px: { xs: 2, sm: 3 }, 
      position: 'relative',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: theme.palette.mode === 'light' 
            ? 'linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />

        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.04 : 0.08)} 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', background: `radial-gradient(circle, ${alpha(theme.palette.success.main, theme.palette.mode === 'light' ? 0.03 : 0.06)} 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <Box sx={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `radial-gradient(ellipse at 80% 20%, transparent 40%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.015 : 0.03)} 41%, transparent 42%),
                            radial-gradient(ellipse at 20% 80%, transparent 50%, ${alpha(theme.palette.success.main, theme.palette.mode === 'light' ? 0.01 : 0.02)} 51%, transparent 52%)`,
          pointerEvents: 'none'
        }} />

        {[
          { icon: <Business />, top: '15%', left: '12%' },
          { icon: <LockOutlined />, top: '25%', right: '15%' },
          { icon: <VerifiedUser />, top: '65%', left: '10%' },
          { icon: <AdminPanelSettings />, top: '75%', right: '12%' },
        ].map((item, index) => (
          <Box key={index} sx={{ 
            position: 'absolute', 
            top: item.top, 
            left: item.left, 
            right: item.right, 
            color: 'text.primary', 
            opacity: theme.palette.mode === 'light' ? 0.08 : 0.04, 
            transform: 'scale(2.5)',
            animation: `float-login ${20 + index * 5}s ease-in-out infinite alternate`,
            '@keyframes float-login': {
              '0%': { transform: 'scale(2.5) translateY(0px)' },
              '100%': { transform: 'scale(2.5) translateY(-30px)' }
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none'
            }
          }}>
            {item.icon}
          </Box>
        ))}
      </Box>

      <Button 
        variant="text" 
        color="inherit" 
        onClick={navigateToHome} 
        sx={{ position: 'absolute', top: 24, left: 24, display: 'flex', alignItems: 'center', gap: 1, zIndex: 10 }}
      >
        &larr; Back to Home
      </Button>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Business sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
              Meridian
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
              Enterprise Platform
            </Typography>
          </Box>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Box sx={{ maxWidth: 500, mx: 'auto', mb: 8, width: '100%' }}>
            <Paper elevation={0} sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 3, 
              border: theme.palette.mode === 'light' ? `1px solid ${alpha(theme.palette.text.primary, 0.08)}` : `1px solid ${theme.palette.divider}`, 
              boxShadow: theme.palette.mode === 'light' ? `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.15)}, 0 0 0 1px ${alpha(theme.palette.common.white, 0.5)} inset` : theme.shadows[4], 
              width: '100%',
              bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#111827',
              backdropFilter: theme.palette.mode === 'light' ? 'blur(12px)' : 'none'
            }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Please enter your enterprise credentials to access the platform.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Email Address"
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
                    label="Password"
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
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Typography 
                  variant="body2" 
                  onClick={() => navigate('/forgot-password')}
                  sx={{ 
                    color: 'primary.main', 
                    cursor: 'pointer', 
                    fontWeight: 600, 
                    '&:hover': { textDecoration: 'underline' } 
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  py: 1.5, 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  letterSpacing: '0.02em', 
                  borderRadius: 2,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </form>
          </Paper>
        </Box>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Box sx={{ width: '100%', mt: 4 }}>
          <Divider sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Demo Access
            </Typography>
          </Divider>

          <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center', mb: 1, color: 'text.primary' }}>
            Select a Role to Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 5, maxWidth: 600, mx: 'auto' }}>
            Click any card below to automatically sign in with that role's pre-configured enterprise credentials.
          </Typography>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 3,
            width: '100%',
            mx: 'auto',
            '@media (min-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (min-width: 1200px)': {
              gridTemplateColumns: 'repeat(5, 1fr)',
            },
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            {roleCards.map((item) => (
              <Card 
                key={item.roleName}
                variant="outlined" 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderRadius: 3, 
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                  boxShadow: theme.shadows[1],
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                <CardContent sx={{ 
                  p: { xs: 2.5, sm: 3 },
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  flexGrow: 1,
                  height: '100%',
                  '&:last-child': { pb: { xs: 2.5, sm: 3 } }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: 56, 
                    height: 56, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1), 
                    color: theme.palette.primary.main,
                    mb: 2,
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </Box>

                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'text.primary', 
                      mb: 1.5, 
                      lineHeight: 1.2,
                      minHeight: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      wordBreak: 'break-word'
                    }}
                  >
                    {item.displayName}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2.5, 
                      lineHeight: 1.5,
                      minHeight: '4.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box sx={{ 
                    width: '100%', 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1F2937', 
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 3,
                    mt: 'auto'
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700, letterSpacing: '0.05em' }}>
                      DEMO EMAIL
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', mt: 0.5, wordBreak: 'break-all' }}>
                      {item.email}
                    </Typography>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => {
                      setValue('email', item.email);
                      setValue('password', 'password123');
                      onSubmit({ email: item.email, password: 'password123' });
                    }}
                    sx={{ 
                      py: 1.2, 
                      fontWeight: 700, 
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                      }
                    }}
                  >
                    Login as {item.roleName}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
