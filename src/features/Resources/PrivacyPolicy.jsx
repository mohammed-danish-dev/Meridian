import React from 'react';
import { Box, Container, Typography, Button, useTheme, Breadcrumbs, Link, Divider, Paper } from '@mui/material';
import { ArrowBack, Security } from '@mui/icons-material';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const navigateToHome = useHomeNavigation();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={navigateToHome} color="inherit" sx={{ mr: 2 }}>Back to Home</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Typography color="text.primary">Privacy Policy</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Security fontSize="large" color="primary" />
            Privacy Policy
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Last Updated: June 29, 2026. This Privacy Policy describes how Meridian handles your information.
          </Typography>
        </Container>
      </Box>
<Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Information Collection</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            We collect information that you provide directly to us when using the Meridian platform. This includes personal identifiers such as your full name, business email address, corporate phone number, company name, company size, and any messages or files you transmit through our secure platform interfaces or contact forms.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            Additionally, we may automatically collect certain metadata and diagnostic information related to your system interaction, including IP addresses, browser types, operating system details, device identifiers, and platform access logs to ensure administrative transparency and compliance auditing.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Data Usage</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            Your data is processed primarily to operate, maintain, and provide the core capabilities of the Meridian platform. Specifically, we use your information to:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 4, mb: 3, '& li': { mb: 1, lineHeight: 1.7 } }}>
            <li>Facilitate role-based access control and authenticate secure enterprise user sessions.</li>
            <li>Process, route, and track procurement requests and managerial approvals.</li>
            <li>Conduct supplier risk assessments and monitor vendor compliance.</li>
            <li>Maintain an immutable, transparent system activity log for regulatory audit purposes.</li>
            <li>Respond to support inquiries and transmit critical system notifications.</li>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Cookies and Tracking Technologies</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            Meridian utilizes essential cookies and similar session state tracking mechanisms to maintain authentication integrity, secure active user sessions, and remember your visual interface preferences (such as light/dark mode configurations). These cookies are strictly necessary for the proper technical operation of the platform. We do not use third-party tracking or advertising cookies.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Data Security and Safeguards</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            We implement industry-standard administrative, physical, and technical safeguards designed to protect your sensitive corporate data against unauthorized access, disclosure, alteration, or destruction. All data in transit is protected using Transport Layer Security (TLS) encryption, and sensitive database components are encrypted at rest using advanced cryptographic standards. Access to data is strictly limited via role-based access guidelines.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. User Rights and Controls</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            Depending on your jurisdiction and corporate governance policies, you may have specific rights regarding your personal information. These include the right to access, rectify, or request the erasure of your personal records, as well as the right to restrict or object to certain processing activities. Since Meridian primarily processes data on behalf of your employer, please contact your organization's system administrator to exercise these rights.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>6. Contact Information</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            If you have any questions, concerns, or regulatory inquiries regarding this Privacy Policy or our general data handling practices, please feel free to reach out to our dedicated data protection office:
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Meridian Data Protection Office</Typography>
            <Typography variant="body2" color="text.secondary">Email: mohammeddanish@gmail.com</Typography>
            <Typography variant="body2" color="text.secondary">Address: Mysore, Karnataka, India – 570007</Typography>
          </Box>
          
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
