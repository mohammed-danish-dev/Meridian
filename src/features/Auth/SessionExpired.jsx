import React from 'react';
import { Box, Button, Typography, Container, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Business, AccessTimeOutlined } from '@mui/icons-material';

const SessionExpired = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0B0F19', p: 2 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Business sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
            Meridian
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
            Enterprise Platform
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[4], textAlign: 'center' }}>
          <AccessTimeOutlined sx={{ fontSize: 64, color: theme.palette.warning.main, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
            Session Expired
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            For your security, enterprise sessions are automatically terminated after periods of inactivity. Please sign in again.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => navigate('/login')}
            sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            Sign In Again
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default SessionExpired;
