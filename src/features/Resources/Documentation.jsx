import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, Button, OutlinedInput, InputAdornment, useTheme, alpha, Breadcrumbs, Link, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Search, ArrowBack, ExpandMore, Code, AccountTree, DisplaySettings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const documentationData = [
  {
    title: 'Getting Started',
    icon: <DisplaySettings />,
    sections: [
      {
        subtitle: 'Introduction',
        content: 'Welcome to the Meridian Enterprise Platform documentation. This comprehensive guide will help you understand the core features, modules, and architecture of our Governance, Risk, and Compliance suite.'
      },
      {
        subtitle: 'Installation',
        content: 'The platform is delivered as a cloud-native SaaS application. No local installation is required for end-users. For enterprise on-premise deployments, please refer to the advanced deployment guide.'
      },
      {
        subtitle: 'Login Guide',
        content: 'Navigate to the application URL and enter your corporate credentials. The system supports SSO (Single Sign-On) via SAML 2.0 and OAuth2 for seamless authentication.'
      },
      {
        subtitle: 'User Roles',
        content: 'The platform utilizes Role-Based Access Control (RBAC). Standard roles include Employee, Manager, Compliance Officer, Auditor, and Administrator. Each role has specific permissions mapped to their operational requirements.'
      }
    ]
  },
  {
    title: 'Platform Modules',
    icon: <AccountTree />,
    sections: [
      {
        subtitle: 'Dashboard',
        content: 'The central hub providing a high-level overview of your enterprise activities, pending approvals, and critical metrics based on your assigned role.'
      },
      {
        subtitle: 'Procurement Workspace',
        content: 'Manage the complete lifecycle of purchase requests. Features include intelligent routing for approvals, budget tracking, and real-time status updates.'
      },
      {
        subtitle: 'Vendor Governance',
        content: 'A centralized repository for managing third-party relationships, tracking vendor performance, compliance certifications, and conducting regular assessments.'
      },
      {
        subtitle: 'Risk Center',
        content: 'Identify, analyze, and mitigate organizational risks. Utilize heat maps and risk scoring to prioritize remediation efforts across different departments.'
      },
      {
        subtitle: 'Compliance Center',
        content: 'Ensure adherence to internal policies and external regulations. Track compliance status, manage policy documents, and handle non-compliance incidents.'
      },
      {
        subtitle: 'Audit Center',
        content: 'Plan, execute, and report on internal and external audits. Maintain an immutable trail of system activities and data modifications for full transparency.'
      }
    ]
  },
  {
    title: 'Developer Guide',
    icon: <Code />,
    sections: [
      {
        subtitle: 'Technology Stack',
        content: 'The application is built using React 18, TypeScript, Material UI (MUI) for component styling, and Redux Toolkit for state management. The backend relies on scalable cloud infrastructure.'
      },
      {
        subtitle: 'Folder Structure',
        content: 'The codebase is organized modularly. Key directories include /src/components for shared UI, /src/pages for route components, /src/store for Redux logic, and /src/utils for helper functions.'
      },
      {
        subtitle: 'Redux Architecture',
        content: 'State is managed centrally using Redux Toolkit slices. Key slices include authSlice (user session), uiSlice (theme preferences), and domain-specific slices (procurement, risk, etc.).'
      },
      {
        subtitle: 'API Services',
        content: 'All external communications are handled through a centralized API service layer, ensuring consistent error handling, authentication token injection, and request formatting.'
      }
    ]
  }
];

const Documentation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(documentationData[0].title);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={navigateToHome} color="inherit" sx={{ mr: 2 }}>Back to Home</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Typography color="text.primary">Documentation</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Platform Documentation</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 'md', mb: 6 }}>
            Comprehensive guides, API references, and tutorials to help you get the most out of the Meridian Enterprise Platform.
          </Typography>

          <OutlinedInput
            fullWidth
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            sx={{ maxWidth: 600, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 1 }}
          />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
<Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ position: 'sticky', top: 100, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <List sx={{ p: 0 }}>
                {documentationData.map((doc, idx) => (
                  <React.Fragment key={doc.title}>
                    <ListItem 
                      component="div"
                      onClick={() => setActiveSection(doc.title)}
                      sx={{ 
                        cursor: 'pointer', 
                        bgcolor: activeSection === doc.title ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                        borderLeft: `4px solid ${activeSection === doc.title ? theme.palette.primary.main : 'transparent'}`,
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                      }}
                    >
                      <ListItemIcon sx={{ color: activeSection === doc.title ? theme.palette.primary.main : 'inherit', minWidth: 40 }}>
                        {doc.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography sx={{ fontWeight: activeSection === doc.title ? 700 : 500, color: activeSection === doc.title ? 'primary.main' : 'text.primary' }}>{doc.title}</Typography>} 
                      />
                    </ListItem>
                    {idx < documentationData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Card>
          </Grid>
<Grid size={{ xs: 12, md: 9 }}>
            {documentationData.filter(doc => doc.title === activeSection).map(doc => (
              <Box key={doc.title}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {doc.icon} {doc.title}
                </Typography>
                
                {doc.sections.map((section, idx) => {
                  if (searchTerm && !section.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) && !section.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return null;
                  }
                  
                  return (
                    <Accordion key={idx} defaultExpanded={idx === 0 || searchTerm !== ''} sx={{ mb: 2, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>{section.subtitle}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 3 }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                          {section.content}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Documentation;
