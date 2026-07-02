import React from 'react';
import { Box, Container, Typography, Button, useTheme, Breadcrumbs, Link, Divider, Paper } from '@mui/material';
import { ArrowBack, Gavel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const TermsOfService = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={navigateToHome} color="inherit" sx={{ mr: 2 }}>Back to Home</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Typography color="text.primary">Terms of Service</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Gavel fontSize="large" color="primary" />
            Terms of Service
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Last Updated: June 29, 2026. Please read these terms carefully before utilizing our platform.
          </Typography>
        </Container>
      </Box>
<Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper variant="outlined" sx={{ p: { xs: 4, md: 6 }, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Acceptance of Terms</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            By accessing or utilizing the Meridian platform, including any associated websites, mobile applications, APIs, or data feeds, you agree to be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from accessing or using the platform's services. These terms constitute a legally binding agreement between you, your enterprise employer, and Meridian.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. User Responsibilities and Accounts</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            To utilize the platform, you must be issued active corporate credentials by an authorized administrator within your enterprise organization. You are fully responsible for maintaining the confidentiality of your credentials and for all activities that occur under your user session. You agree to notify your organization's IT security team immediately of any suspected unauthorized access or compromise of your login details.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Acceptable Use Policy</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            You agree to use Meridian strictly in compliance with applicable laws, corporate regulations, and ethical guidelines. You are expressly prohibited from:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 4, mb: 3, '& li': { mb: 1, lineHeight: 1.7 } }}>
            <li>Using the platform for any fraudulent, malicious, or unlawful purpose.</li>
            <li>Uploading or transmitting any data that contains viruses, malware, or destructive payloads.</li>
            <li>Attempting to bypass authentication mechanisms, gain unauthorized access to secondary directories, or perform security probe testing without explicit authorization.</li>
            <li>Reverse engineering, copying, or distributing any proprietary software elements of the GRC system.</li>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Intellectual Property</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            All right, title, and interest in and to the Meridian platform, including intellectual property rights, source code, designs, algorithms, logos, documentation, and layout layouts, remain exclusively with Meridian Enterprise Solutions. Your organization is granted a limited, non-exclusive, non-transferable license to access the services in accordance with your master subscription agreement.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Limitation of Liability</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            To the maximum extent permitted by applicable law, Meridian and its affiliates, suppliers, and licensors shall not be held liable for any indirect, incidental, special, exemplary, or consequential damages, including loss of profits, loss of data, business interruption, or other intangible losses resulting from your access to, or inability to access, the platform.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>6. Termination of Access</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
            We reserve the right, in accordance with our master service agreements, to temporarily suspend or permanently terminate your user account or broader enterprise access to the platform at any time, with or without prior notice, in the event of a suspected security breach, compliance violation, or failure to adhere to the terms herein.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>7. Governing Law and Jurisdiction</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            These Terms of Service and any disputes arising out of or relating to your use of the Meridian platform shall be governed by, and construed in accordance with, the laws of the State of New York, without regard to its conflict of law principles. Any legal actions or proceedings arising under these terms shall be brought exclusively in federal or state courts located in New York County, New York.
          </Typography>
          
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;
