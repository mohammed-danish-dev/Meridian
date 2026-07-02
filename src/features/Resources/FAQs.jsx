import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Button, OutlinedInput, InputAdornment, useTheme, Breadcrumbs, Link, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { Search, ArrowBack, ExpandMore, Help } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const faqData = [
  { category: 'General', question: 'What is Meridian?', answer: 'Meridian is an Enterprise Governance, Risk, and Compliance Platform. It is a unified suite designed to help organizations manage their core operational processes securely and efficiently.' },
  { category: 'General', question: 'How do I switch between Dark and Light mode?', answer: 'You can toggle between Dark and Light mode using the sun/moon icon located in the top navigation bar of the application.' },
  { category: 'General', question: 'How does role-based access work?', answer: 'The platform utilizes Role-Based Access Control (RBAC). Depending on your assigned role (e.g., Employee, Manager, Administrator), you will only see data and actions relevant to your responsibilities.' },
  { category: 'General', question: 'Is my data secure?', answer: 'Yes, the platform employs industry-standard encryption protocols both in transit and at rest. Access is strictly governed by your enterprise identity provider.' },
  
  { category: 'Procurement', question: 'How do I create a procurement request?', answer: 'Navigate to the Procurement module from the Dashboard, click "New Request", fill in the required details including department and budget, and submit. It will automatically route to the appropriate manager.' },
  { category: 'Procurement', question: 'How do approvals work?', answer: 'Once a request is submitted, it enters a "Pending" state. Managers can view these requests in their dashboard and choose to "Approve" or "Reject" them based on the provided justification and available budget.' },
  { category: 'Procurement', question: 'Can I track the status of my request?', answer: 'Yes, the status of your procurement requests is updated in real-time on your dashboard and within the Procurement module list view.' },
  { category: 'Procurement', question: 'What happens if my request is rejected?', answer: 'If a request is rejected, you will receive a notification outlining the reason. You can then modify the request and resubmit it for approval.' },
  
  { category: 'Vendors', question: 'How are vendors managed?', answer: 'The Vendor module allows you to onboard new vendors, categorize them, assign risk levels, and track their performance over time. Managers can update their status from "Pending" to "Active" or "Suspended".' },
  { category: 'Vendors', question: 'How do I add a new vendor?', answer: 'Authorized roles can click "Add Vendor" in the Vendor Governance section, input the vendor details, and initiate the onboarding and review process.' },
  { category: 'Vendors', question: 'What does the Risk Level indicate?', answer: 'The Risk Level (Low, Medium, High) helps organizations prioritize oversight. High-risk vendors require more frequent audits and stricter compliance checks.' },
  
  { category: 'Risk', question: 'How does Risk Management work?', answer: 'The Risk module allows you to log potential risks, categorize them (e.g., Financial, Operational, Cyber), assess their impact and likelihood, and assign them a severity level. Mitigation plans can then be tracked.' },
  { category: 'Risk', question: 'Who can log a new risk?', answer: 'Typically, Managers, Compliance Officers, and Administrators can log new risks, while Employees might report incidents that are later classified as risks by the compliance team.' },
  { category: 'Risk', question: 'What is a heat map?', answer: 'A heat map is a visual representation of your organization\'s risks, plotted by Likelihood vs. Impact, allowing stakeholders to quickly identify areas requiring immediate attention.' },
  
  { category: 'Compliance', question: 'What is Compliance Monitoring?', answer: 'Compliance Monitoring involves tracking whether your organization is adhering to internal policies and external regulations. The system tracks policy statuses like "Compliant", "Non-Compliant", or "Expired".' },
  { category: 'Compliance', question: 'How are compliance records updated?', answer: 'Compliance Officers can review evidence, conduct assessments, and manually update the status of compliance records within the platform.' },
  { category: 'Compliance', question: 'What happens when a certification expires?', answer: 'The system automatically flags expired certifications and generates an alert for the Compliance team to initiate the renewal process.' },
  
  { category: 'Audit & Reports', question: 'How are reports generated?', answer: 'The Reporting module aggregates data from all other modules. You can select predefined templates or create custom reports based on specific timeframes and criteria.' },
  { category: 'Audit & Reports', question: 'How do I export reports?', answer: 'Within the Reporting module, authorized users can click the "Export" button to download data in various formats, such as PDF or CSV, for external stakeholder review.' },
  { category: 'Audit & Reports', question: 'What is the Audit Trail?', answer: 'The Audit Trail is an immutable, chronologically ordered record of all significant actions taken within the system (e.g., approvals, data modifications, logins), essential for regulatory compliance.' }
];

const categories = ['All', 'General', 'Procurement', 'Vendors', 'Risk', 'Compliance', 'Audit & Reports'];

const FAQs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedAll, setExpandedAll] = useState(false);
  const [expandedPanels, setExpandedPanels] = useState([]);

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleToggleExpandAll = () => {
    if (expandedAll) {
      setExpandedPanels([]);
    } else {
      setExpandedPanels(filteredFAQs.map((_, index) => `panel-${index}`));
    }
    setExpandedAll(!expandedAll);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpandedPanels([...expandedPanels, panel]);
    } else {
      setExpandedPanels(expandedPanels.filter(p => p !== panel));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={navigateToHome} color="inherit" sx={{ mr: 2 }}>Back to Home</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Typography color="text.primary">FAQs</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Help fontSize="large" color="primary" />
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Find quick answers to common questions about the Meridian platform.
          </Typography>
<OutlinedInput
            fullWidth
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            sx={{ bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 1, mb: 3 }}
          />
<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                color={selectedCategory === cat ? 'primary' : 'default'}
                variant={selectedCategory === cat ? 'filled' : 'outlined'}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button onClick={handleToggleExpandAll} variant="text" sx={{ fontWeight: 600 }}>
            {expandedAll ? 'Collapse All' : 'Expand All'}
          </Button>
        </Box>

        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => {
            const panelId = `panel-${index}`;
            return (
              <Accordion 
                key={index} 
                expanded={expandedPanels.includes(panelId) || searchTerm !== ''}
                onChange={handleAccordionChange(panelId)}
                sx={{ 
                  mb: 2, 
                  border: `1px solid ${theme.palette.divider}`, 
                  boxShadow: 'none', 
                  borderRadius: '8px !important',
                  '&:before': { display: 'none' } 
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0F172A', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B' }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                    {faq.answer}
                  </Typography>
                  <Chip label={faq.category} size="small" sx={{ mt: 2, borderRadius: 1, opacity: 0.8 }} />
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">No FAQs found matching your criteria.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FAQs;
