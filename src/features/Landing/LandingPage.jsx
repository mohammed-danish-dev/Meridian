import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Card, CardContent, useTheme, alpha, IconButton, Grid, Avatar, TextField, MenuItem, Snackbar, Alert, CircularProgress, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Shield, Verified, BarChart, Settings, BookOpen, FileText, HelpCircle, Briefcase, Zap, Layers, Server, Activity, Newspaper, Mail, Phone, Clock, MapPin, Twitter, Linkedin, Github, Facebook, PieChart } from 'lucide-react';
import { Business, LightMode, DarkMode, Menu as MenuIcon } from '@mui/icons-material';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toggleTheme } from '../../store/slices/uiSlice';

const contactSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  companyName: yup.string().required('Company name is required'),
  businessEmail: yup.string().email('Enter a valid email address').required('Business email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,20}$/, 'Enter a valid phone number'),
  companySize: yup.string().required('Please select your company size'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.ui);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      businessEmail: '',
      phoneNumber: '',
      companySize: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmittingForm(true);
    try {
      const response = await axios.post('/api/contact-mock', data).catch(err => {
        return { status: 200, data: { success: true } };
      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Thank you! Your request has been submitted successfully. Our team will contact you shortly.');
        setSnackbarOpen(true);
        reset();
      } else {
        throw new Error('Server returned error status');
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('An error occurred while submitting your request. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
<Box component="nav" sx={{ 
        borderBottom: 1, 
        borderColor: scrolled ? 'transparent' : 'divider', 
        bgcolor: theme.palette.mode === 'light' ? (scrolled ? 'rgba(255,255,255,0.95)' : '#FFFFFF') : (scrolled ? 'rgba(11,15,25,0.95)' : '#0B0F19'), 
        py: 2, 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100,
        boxShadow: scrolled ? (theme.palette.mode === 'light' ? '0 4px 20px rgba(0,0,0,0.05)' : '0 4px 20px rgba(0,0,0,0.2)') : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => handleScrollTo('home')}>
            <Business color="primary" sx={{ fontSize: 32 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.1 }}>
                Meridian
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '0.7rem', fontWeight: 500, mt: 0.2 }}>
                Guiding Enterprise Excellence.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleMobileMenuToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
            <Typography onClick={() => handleScrollTo('platform')} variant="subtitle2" sx={{ cursor: 'pointer', fontWeight: 600, color: activeSection === 'platform' ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>Platform</Typography>
            <Typography onClick={() => handleScrollTo('solutions')} variant="subtitle2" sx={{ cursor: 'pointer', fontWeight: 600, color: activeSection === 'solutions' ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>Solutions</Typography>
            <Typography onClick={() => handleScrollTo('resources')} variant="subtitle2" sx={{ cursor: 'pointer', fontWeight: 600, color: activeSection === 'resources' ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}>Resources</Typography>
            <Box sx={{ display: 'flex', gap: 2, ml: 2, alignItems: 'center' }}>
              <IconButton color="inherit" onClick={() => dispatch(toggleTheme())} size="small" sx={{ bgcolor: theme.palette.mode === 'light' ? alpha('#0F172A', 0.04) : alpha('#FFFFFF', 0.05) }}>
                {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
              <Button variant="outlined" onClick={() => navigate('/login')} sx={{ px: 3 }}>Sign In</Button>
              <Button variant="contained" onClick={() => handleScrollTo('contact')} sx={{ px: 3 }}>Request Demo</Button>
            </Box>
          </Box>
        </Container>
      </Box>
<Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{ '& .MuiDrawer-paper': { width: 250, p: 2 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography onClick={() => { handleScrollTo('platform'); setMobileMenuOpen(false); }} variant="subtitle1" sx={{ cursor: 'pointer', fontWeight: 600 }}>Platform</Typography>
          <Typography onClick={() => { handleScrollTo('solutions'); setMobileMenuOpen(false); }} variant="subtitle1" sx={{ cursor: 'pointer', fontWeight: 600 }}>Solutions</Typography>
          <Typography onClick={() => { handleScrollTo('resources'); setMobileMenuOpen(false); }} variant="subtitle1" sx={{ cursor: 'pointer', fontWeight: 600 }}>Resources</Typography>
          <Button variant="outlined" onClick={() => navigate('/login')} fullWidth>Sign In</Button>
          <Button variant="contained" onClick={() => { handleScrollTo('contact'); setMobileMenuOpen(false); }} fullWidth>Request Demo</Button>
        </Box>
      </Drawer>
<Box id="home" component="section" sx={{ 
        pt: { xs: 12, md: 18 }, 
        pb: { xs: 2, md: 4 },
        bgcolor: theme.palette.mode === 'light' ? '#FAFAFC' : '#040B16',
        color: 'text.primary', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '80px',
        zIndex: 1
      }}>
<Box sx={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: theme.palette.mode === 'light' 
            ? 'linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: -1,
          opacity: 0.5
        }} />
<Box sx={{ position: 'absolute', top: '-10%', left: '10%', width: '40%', height: '80%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.04 : 0.08)} 0%, transparent 60%)`, pointerEvents: 'none', zIndex: -1 }} />
        <Box sx={{ position: 'absolute', top: '20%', right: '5%', width: '45%', height: '70%', background: `radial-gradient(circle, ${alpha(theme.palette.success.main, theme.palette.mode === 'light' ? 0.03 : 0.06)} 0%, transparent 60%)`, pointerEvents: 'none', zIndex: -1 }} />
<Box sx={{
          position: 'absolute', top: '10%', left: '-10%', width: '120%', height: '100%',
          backgroundImage: `radial-gradient(ellipse at 50% -20%, transparent 40%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.015 : 0.03)} 41%, transparent 42%),
                            radial-gradient(ellipse at 50% -30%, transparent 50%, ${alpha(theme.palette.success.main, theme.palette.mode === 'light' ? 0.01 : 0.02)} 51%, transparent 52%)`,
          pointerEvents: 'none', zIndex: -1
        }} />
<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
          {[
            { icon: <Shield />, top: '15%', left: '8%' },
            { icon: <BarChart />, top: '25%', right: '12%' },
            { icon: <Briefcase />, top: '55%', left: '15%' },
            { icon: <Verified />, top: '65%', right: '8%' },
            { icon: <Business />, top: '40%', left: '5%' },
            { icon: <Server />, top: '10%', right: '25%' },
            { icon: <FileText />, top: '80%', left: '22%' },
            { icon: <Activity />, top: '75%', right: '18%' }
          ].map((item, index) => (
            <Box key={index} sx={{ 
              position: 'absolute', 
              top: item.top, 
              left: item.left, 
              right: item.right, 
              color: 'text.primary', 
              opacity: theme.palette.mode === 'light' ? 0.08 : 0.04, 
              transform: 'scale(2.5)',
              animation: `float ${20 + index * 3}s ease-in-out infinite alternate`,
              '@keyframes float': {
                '0%': { transform: 'scale(2.5) translateY(0px)' },
                '100%': { transform: 'scale(2.5) translateY(-20px)' }
              },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none'
              }
            }}>
              {item.icon}
            </Box>
          ))}
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
              THE INTELLIGENT ENTERPRISE SUITE
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Govern, Mitigate, and Procure with Confidence
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400, maxWidth: '80%', mx: 'auto', lineHeight: 1.6 }}>
              A unified, scalable platform to manage vendor lifecycles, mitigate enterprise risks, ensure regulatory compliance, and streamline procurement processes globally.
            </Typography>
          </motion.div>
<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1, 
              px: 2, 
              py: 0.75, 
              borderRadius: 50, 
              bgcolor: alpha(theme.palette.success.main, 0.1), 
              color: theme.palette.success.dark, 
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              mb: 5
            }}>
              <Verified size={16} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Trusted Enterprise SaaS Platform
              </Typography>
            </Box>
          </motion.div>
<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/login')} 
              sx={{ 
                py: 2, px: 5, fontSize: '1.05rem', fontWeight: 600, 
                bgcolor: theme.palette.primary.main,
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                }
              }}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => handleScrollTo('contact')} 
              sx={{ 
                py: 2, px: 5, fontSize: '1.05rem', fontWeight: 600,
                borderWidth: 2,
                borderColor: alpha(theme.palette.text.primary, 0.15), 
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  borderWidth: 2,
                  borderColor: theme.palette.text.primary, 
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  transform: 'translateY(-2px)'
                } 
              }}
            >
              Talk to Sales
            </Button>
            </Box>
          </motion.div>
        </Container>
<Container maxWidth="lg" sx={{ mt: { xs: 8, md: 9 }, mb: { xs: 5, md: 7 }, position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { num: '10K+', desc: 'Procurement Requests', icon: <Briefcase /> },
              { num: '1,200+', desc: 'Enterprise Vendors', icon: <Business /> },
              { num: '99.9%', desc: 'Compliance Accuracy', icon: <Verified /> },
              { num: '24/7', desc: 'Risk Monitoring', icon: <Shield /> }
            ].map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ height: '100%' }}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 4, 
                  border: theme.palette.mode === 'light' ? `1px solid ${alpha(theme.palette.text.primary, 0.08)}` : `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                  boxShadow: theme.palette.mode === 'light' ? `0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.08)}, 0 4px 12px -4px ${alpha('#000000', 0.05)}` : `0 10px 30px -10px ${alpha('#000000', 0.05)}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : '#111827',
                  backdropFilter: theme.palette.mode === 'light' ? 'blur(10px)' : 'none',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'light' ? `0 20px 32px -8px ${alpha(theme.palette.primary.main, 0.12)}, 0 8px 16px -4px ${alpha('#000000', 0.08)}` : `0 20px 40px -10px ${alpha('#000000', 0.1)}`,
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 3, 
                      bgcolor: i === 0 ? alpha(theme.palette.primary.main, 0.1) : i === 1 ? alpha(theme.palette.info.main, 0.1) : i === 2 ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                      color: i === 0 ? theme.palette.primary.main : i === 1 ? theme.palette.info.main : i === 2 ? theme.palette.success.main : theme.palette.error.main,
                      mb: 2,
                      display: 'inline-flex'
                    }}>
                      {React.cloneElement(stat.icon, { size: 28, fontSize: 'large' })}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
                      {stat.num}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {stat.desc}
                    </Typography>
                  </CardContent>
                </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
<Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: 1100, 
            mx: 'auto',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : '#111827',
            backdropFilter: theme.palette.mode === 'light' ? 'blur(12px)' : 'none',
            borderRadius: 5,
            border: theme.palette.mode === 'light' ? `1px solid ${alpha(theme.palette.text.primary, 0.08)}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: theme.palette.mode === 'light' 
              ? `0 40px 80px -12px ${alpha(theme.palette.primary.main, 0.15)}, 0 20px 40px -16px ${alpha('#000000', 0.08)}, 0 0 0 1px ${alpha(theme.palette.common.white, 0.5)} inset` 
              : `0 30px 60px -12px ${alpha('#000000', 0.5)}`,
            overflow: 'hidden',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
            }
          }}>
<Box sx={{ 
              display: 'flex', alignItems: 'center', p: 1.5, 
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1F2937'
            }}>
              <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#EF4444' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
              </Box>
              <Box sx={{ mx: 'auto', px: 3, py: 0.5, borderRadius: 1.5, bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827', border: `1px solid ${alpha(theme.palette.divider, 0.05)}` }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>meridian-app.enterprise.com</Typography>
              </Box>
            </Box>
<Box sx={{ display: 'flex', height: { xs: 450, sm: 550, md: 650 }, overflow: 'hidden' }}>
<Box sx={{ 
                width: { xs: 60, md: 220 }, 
                borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                p: 2, display: 'flex', flexDirection: 'column', gap: 1.5
              }}>
                {[
                  { icon: <Layers size={18} />, active: true, text: 'Dashboard' },
                  { icon: <Briefcase size={18} />, active: false, text: 'Procurement' },
                  { icon: <Business size={18} />, active: false, text: 'Vendors' },
                  { icon: <Shield size={18} />, active: false, text: 'Risk' },
                  { icon: <Verified size={18} />, active: false, text: 'Compliance' },
                  { icon: <FileText size={18} />, active: false, text: 'Reports' },
                ].map((item, i) => (
                  <Box key={i} sx={{ 
                    height: 40, borderRadius: 2, 
                    bgcolor: item.active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    display: 'flex', alignItems: 'center', px: { xs: 0, md: 1.5 }, justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1.5,
                    color: item.active ? theme.palette.primary.main : 'text.secondary'
                  }}>
                    {item.icon}
                    <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: item.active ? 600 : 500 }}>{item.text}</Typography>
                  </Box>
                ))}
              </Box>
<Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0B0F19', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.25rem' } }}>Enterprise Overview</Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: alpha(theme.palette.text.secondary, 0.1), display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}><Activity size={16} /></Box>
                    <Box sx={{ width: 80, height: 32, borderRadius: 1.5, bgcolor: theme.palette.primary.main, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>New Report</Box>
                  </Box>
                </Box>
<Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                  {[
                    { label: 'Total Requests', value: '2,486', color: theme.palette.primary.main, icon: <Layers size={20} /> },
                    { label: 'Pending Requests', value: '184', color: theme.palette.warning.main, icon: <Clock size={20} /> },
                    { label: 'Approved Requests', value: '2,137', color: theme.palette.success.main, icon: <Verified size={20} /> },
                    { label: 'Vendors', value: '1,248', color: theme.palette.info.main, icon: <Business fontSize="small" /> }
                  ].map((stat, i) => (
                    <Box key={i} sx={{ 
                      p: 2, borderRadius: 3, 
                      bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                      border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                      boxShadow: `0 4px 6px -1px ${alpha('#000000', 0.05)}`,
                      display: 'flex', flexDirection: 'column'
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: alpha(stat.color, 0.1), color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>+12%</Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{stat.value}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: { xs: '0.65rem', md: '0.75rem' } }}>{stat.label}</Typography>
                    </Box>
                  ))}
                </Box>
<Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flex: 1, minHeight: 0 }}>
                   <Box sx={{ 
                      flex: { xs: 1, md: 2 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, minHeight: 0
                    }}>
<Box sx={{ 
                        flex: 1, p: 2, borderRadius: 3, 
                        bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                        border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                        boxShadow: `0 4px 6px -1px ${alpha('#000000', 0.05)}`,
                        display: 'flex', flexDirection: 'column'
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Monthly Procurement Trend</Typography>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 1.5, px: { xs: 0, md: 2 }, mt: 1 }}>
                          {[40, 70, 45, 90, 60, 80, 50, 100].map((h, i) => (
                            <Box key={i} sx={{ flex: 1, height: `${h}%`, bgcolor: alpha(theme.palette.primary.main, 0.2 + (i*0.1)), borderRadius: '4px 4px 0 0' }} />
                          ))}
                        </Box>
                      </Box>
<Box sx={{ 
                        flex: 1, p: 2, borderRadius: 3, 
                        bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                        border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                        boxShadow: `0 4px 6px -1px ${alpha('#000000', 0.05)}`,
                        display: 'flex', flexDirection: 'column', overflow: 'hidden'
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Recent Procurements</Typography>
                        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', pb: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                            <Typography variant="caption" sx={{ flex: 1, fontWeight: 700, color: 'text.secondary' }}>Request ID</Typography>
                            <Typography variant="caption" sx={{ flex: 2, fontWeight: 700, color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>Department</Typography>
                            <Typography variant="caption" sx={{ flex: 3, fontWeight: 700, color: 'text.secondary' }}>Vendor</Typography>
                            <Typography variant="caption" sx={{ flex: 2, fontWeight: 700, color: 'text.secondary' }}>Amount</Typography>
                            <Typography variant="caption" sx={{ flex: 1.5, fontWeight: 700, color: 'text.secondary', textAlign: 'right' }}>Status</Typography>
                          </Box>
                          {[
                            { id: 'PR-1001', dept: 'Finance', vendor: 'Tech Solutions Pvt Ltd', amount: '₹4,50,000', status: 'Approved', color: theme.palette.success.main },
                            { id: 'PR-1002', dept: 'IT', vendor: 'Infosys', amount: '₹8,25,000', status: 'Pending', color: theme.palette.warning.main },
                            { id: 'PR-1003', dept: 'HR', vendor: 'TCS', amount: '₹2,75,000', status: 'Completed', color: theme.palette.primary.main },
                          ].map((row, i) => (
                            <Box key={i} sx={{ display: 'flex', py: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`, alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>{row.id}</Typography>
                              <Typography variant="caption" sx={{ flex: 2, display: { xs: 'none', md: 'block' }, color: 'text.secondary' }}>{row.dept}</Typography>
                              <Typography variant="caption" sx={{ flex: 3, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.vendor}</Typography>
                              <Typography variant="caption" sx={{ flex: 2, fontWeight: 600 }}>{row.amount}</Typography>
                              <Box sx={{ flex: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ px: 1, py: 0.25, borderRadius: 1, bgcolor: alpha(row.color, 0.1), color: row.color, fontSize: '0.65rem', fontWeight: 700 }}>{row.status}</Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                   </Box>
<Box sx={{ 
                      display: { xs: 'none', md: 'flex' }, flex: 1, flexDirection: 'column', gap: 3, minHeight: 0
                    }}>
<Box sx={{ 
                        p: 2, borderRadius: 3, 
                        bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                        border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                        boxShadow: `0 4px 6px -1px ${alpha('#000000', 0.05)}`,
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Action Items</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {[
                            { text: '3 High Priority Alerts', color: theme.palette.error.main, icon: <Activity size={14} /> },
                            { text: '5 Pending Approvals', color: theme.palette.warning.main, icon: <Clock size={14} /> },
                            { text: '2 Audit Reviews', color: theme.palette.info.main, icon: <FileText size={14} /> }
                          ].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 1.5, bgcolor: alpha(item.color, 0.05) }}>
                              <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: alpha(item.color, 0.1), color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.icon}
                              </Box>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>{item.text}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
<Box sx={{ 
                        flex: 1, p: 2, borderRadius: 3, 
                        bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#111827',
                        border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                        boxShadow: `0 4px 6px -1px ${alpha('#000000', 0.05)}`,
                        display: 'flex', flexDirection: 'column', overflow: 'hidden'
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Recent Activities</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                          {[
                            { text: 'Vendor ABC onboarded', time: '10 mins ago' },
                            { text: 'Procurement Request PR-1024 approved', time: '1 hour ago' },
                            { text: 'Compliance review completed', time: '3 hours ago' },
                            { text: 'Risk assessment submitted', time: '5 hours ago' },
                            { text: 'Audit report generated', time: '1 day ago' }
                          ].map((activity, i) => (
                            <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: theme.palette.primary.main, mt: 0.5 }} />
                                {i !== 4 && <Box sx={{ width: 2, flex: 1, bgcolor: alpha(theme.palette.divider, 0.5), my: 0.5 }} />}
                              </Box>
                              <Box sx={{ pb: i !== 4 ? 1 : 0 }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: 'text.primary', lineHeight: 1.2, mb: 0.5 }}>{activity.text}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>{activity.time}</Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                   </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          </motion.div>
        </Container>
<Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: { xs: 40, md: 60 }, 
          background: `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`,
          pointerEvents: 'none'
        }} />
      </Box>
<Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: theme.palette.mode === 'light' ? 'background.default' : 'transparent' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 1, display: 'block' }}>ENTERPRISE WORKFLOW</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>How Meridian Works</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'stretch', gap: { xs: 2, md: 1 } }}>
            {[
              { title: 'Request', desc: 'Create Procurement Request', icon: <Briefcase size={20} /> },
              { title: 'Approval', desc: 'Manager Approval', icon: <Verified size={20} /> },
              { title: 'Compliance', desc: 'Compliance Verification', icon: <BookOpen size={20} /> },
              { title: 'Risk', desc: 'Risk Assessment', icon: <Shield size={20} /> },
              { title: 'Audit', desc: 'Audit Logging', icon: <FileText size={20} /> },
              { title: 'Analytics', desc: 'Reports & Analytics', icon: <BarChart size={20} /> }
            ].map((step, idx, arr) => (
              <Box key={idx} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', flex: 1, position: 'relative' }}>
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }} style={{ width: '100%' }}>
                  <Card sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: theme.palette.mode === 'light' ? 'background.paper' : alpha('#111827', 0.6)
                  }}>
                    <Box sx={{ color: theme.palette.primary.main, mb: 1.5, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{step.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{step.desc}</Typography>
                  </Card>
                </motion.div>
                {idx < arr.length - 1 && (
                  <Box sx={{ 
                    display: { xs: 'none', md: 'flex' }, 
                    width: 20, 
                    height: 2, 
                    bgcolor: theme.palette.divider,
                    mx: 1
                  }} />
                )}
                {idx < arr.length - 1 && (
                  <Box sx={{ 
                    display: { xs: 'flex', md: 'none' }, 
                    height: 20, 
                    width: 2, 
                    bgcolor: theme.palette.divider,
                    my: 1
                  }} />
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
<Box id="platform" component="section" sx={{ 
        scrollMarginTop: '80px', 
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 10 }, 
        flexGrow: 1,
        bgcolor: theme.palette.mode === 'light' ? 'background.default' : 'transparent',
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}>PLATFORM OVERVIEW</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 3, color: 'text.primary' }}>
              One Unified Enterprise Platform
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
              Manage Governance, Risk, Compliance, Procurement, Vendor Management, and Audit from one centralized enterprise platform. Streamline workflows, improve visibility, automate approvals, and empower better business decisions through a secure and scalable solution.
            </Typography>
          </Box>
          
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { title: 'Unified Operations', icon: <Layers size={24} /> },
              { title: 'Intelligent Workflows', icon: <Zap size={24} /> },
              { title: 'Enterprise Security', icon: <Shield size={24} /> },
              { title: 'Real-Time Analytics', icon: <BarChart size={24} /> },
              { title: 'Scalable Architecture', icon: <Server size={24} /> },
              { title: 'Centralized Management', icon: <Settings size={24} /> },
            ].map((highlight, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} style={{ height: '100%' }}>
                <Card sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  p: 2.5, 
                  border: `1px solid ${theme.palette.divider}`, 
                  boxShadow: 'none',
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[2],
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease-in-out',
                  height: '100%'
                }}>
                  <Box sx={{ 
                    color: theme.palette.primary.main, 
                    bgcolor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.2), 
                    width: 44, 
                    height: 44, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {highlight.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {highlight.title}
                  </Typography>
                </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
<Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: theme.palette.mode === 'light' ? 'background.default' : 'transparent' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>Why Choose Meridian?</Typography>
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { title: 'Governance', desc: 'Centralized enterprise governance across departments.', icon: <Business size={24} /> },
              { title: 'Procurement', desc: 'Digitize and streamline procurement workflows.', icon: <Briefcase size={24} /> },
              { title: 'Risk Management', desc: 'Monitor, assess, and mitigate operational risks.', icon: <Shield size={24} /> },
              { title: 'Compliance', desc: 'Automate compliance monitoring and reporting.', icon: <Verified size={24} /> },
            ].map((feature, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }} style={{ height: '100%' }}>
                  <Card sx={{ 
                    height: '100%', 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}>
                    <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
<Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: theme.palette.mode === 'light' ? 'background.paper' : alpha('#111827', 0.5), borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>Enterprise Security & Trust</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {[
              'Secure Authentication',
              'Role-Based Access',
              'Complete Audit Trails',
              'Real-Time Monitoring',
              'Enterprise Reporting',
              'High Availability'
            ].map((badge, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.05 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  px: 3, 
                  py: 1.5, 
                  borderRadius: 50, 
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: theme.palette.mode === 'light' ? 'background.default' : 'background.paper',
                  boxShadow: theme.shadows[1]
                }}>
                  <Verified size={18} color={theme.palette.success.main} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{badge}</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
<Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: theme.palette.mode === 'light' ? 'background.default' : 'transparent' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>What Enterprise Teams Say</Typography>
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {[
              { quote: 'Meridian significantly improved our procurement visibility and efficiency.', role: 'Procurement Manager' },
              { quote: 'The automated compliance checks saved us hundreds of hours this quarter.', role: 'Chief Compliance Officer' },
              { quote: 'A robust platform that easily scales with our enterprise demands.', role: 'Director of Risk Management' }
            ].map((testimonial, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.1 }} style={{ height: '100%' }}>
                  <Card sx={{ 
                    height: '100%', 
                    p: 4, 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}>
                    <Box sx={{ color: '#F59E0B', mb: 2, letterSpacing: 2 }}>★★★★★</Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, flexGrow: 1 }}>"{testimonial.quote}"</Typography>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>— {testimonial.role}</Typography>
                      <Typography variant="caption" color="text.secondary">(Demo)</Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
<Box id="solutions" component="section" sx={{ scrollMarginTop: '80px', py: { xs: 8, md: 12 }, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}>SOLUTIONS</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 2, color: 'text.primary' }}>
              Comprehensive Enterprise Solutions
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Tailored modules to handle your organization's most complex operations.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {[
              { title: 'Procurement Management', desc: 'Streamline purchase requests and budget tracking.', icon: <Briefcase size={32} /> },
              { title: 'Vendor Governance', desc: 'Onboard and monitor enterprise vendor performance.', icon: <Verified size={32} /> },
              { title: 'Risk Management', desc: 'Identify and mitigate risks with real-time analytics.', icon: <Shield size={32} /> },
              { title: 'Compliance Management', desc: 'Maintain strict regulatory compliance standards.', icon: <BookOpen size={32} /> },
              { title: 'Audit Management', desc: 'Track all activities with immutable audit trails.', icon: <BarChart size={32} /> },
              { title: 'Reporting & Analytics', desc: 'Generate dynamic insights for stakeholders.', icon: <PieChart size={32} /> },
              { title: 'Workflow Automation', desc: 'Automate complex enterprise business processes.', icon: <Activity size={32} /> },
            ].map((feature, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', bgcolor: 'background.paper', '&:hover': { boxShadow: theme.shadows[4], borderColor: theme.palette.primary.main, transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 3, bgcolor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.2), width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ p: 0, pb: '0 !important' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
<Box id="resources" component="section" sx={{ scrollMarginTop: '80px', py: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 'md', mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}>RESOURCES</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 2, color: 'text.primary' }}>
              Knowledge & Support
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Access our library of resources to maximize your platform success.
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {[
              { title: 'Blogs', desc: 'Read the latest industry insights and platform updates from our experts.', icon: <Newspaper size={40} /> },
              { title: 'Documentation', desc: 'Comprehensive guides, API references, and tutorials for developers.', icon: <FileText size={40} /> },
              { title: 'FAQs', desc: 'Find quick answers to common questions and support inquiries.', icon: <HelpCircle size={40} /> },
            ].map((res, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ height: '100%' }}>
                <Card sx={{ height: '100%', p: 4, textAlign: 'center', border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', '&:hover': { borderColor: theme.palette.primary.main, bgcolor: theme.palette.mode === 'light' ? alpha(theme.palette.primary.main, 0.02) : alpha(theme.palette.primary.main, 0.05) }, transition: 'all 0.2s' }}>
                  <Box sx={{ display: 'inline-flex', color: theme.palette.primary.main, mb: 3 }}>
                    {res.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{res.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{res.desc}</Typography>
                  <Button variant="text" onClick={() => navigate(`/${res.title.toLowerCase()}`)} sx={{ mt: 3, fontWeight: 600 }}>Explore {res.title}</Button>
                </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
<Box id="contact" component="section" sx={{ scrollMarginTop: '80px', py: { xs: 8, md: 12 }, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} sx={{ alignItems: 'stretch' }}>
<Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}>GET IN TOUCH</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 3, color: 'text.primary' }}>
                  Connect with Our Enterprise GRC Experts
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 6, lineHeight: 1.7, fontSize: '1.1rem' }}>
                  Have questions about compliance workflows, procurement auditing, or custom deployment configurations? Fill out the form, and our solutions architects will reach out to schedule a tailored system walkthrough.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      <Mail size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>Email Inquiry</Typography>
                      <Typography variant="body2" color="text.secondary">General: mohammeddanish@gmail.com</Typography>
                      <Typography variant="body2" color="text.secondary">Support: mohammeddanish@gmail.com</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      <Phone size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>Call Sales & Support</Typography>
                      <Typography variant="body2" color="text.secondary">+91 9113629477</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      <Clock size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>Business Hours</Typography>
                      <Typography variant="body2" color="text.secondary">Monday – Friday: 9:00 AM – 6:00 PM IST</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      <MapPin size={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>Office Headquarters</Typography>
                      <Typography variant="body2" color="text.secondary">Mysore, Karnataka, India – 570007</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
<Box sx={{ mt: { xs: 6, md: 0 }, pt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', mr: 2 }}>Follow us:</Typography>
                {[
                  { icon: <Twitter size={18} />, url: 'https://twitter.com' },
                  { icon: <Linkedin size={18} />, url: 'https://linkedin.com' },
                  { icon: <Github size={18} />, url: 'https://github.com' },
                  { icon: <Facebook size={18} />, url: 'https://facebook.com' },
                ].map((social, idx) => (
                  <IconButton 
                    key={idx} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    sx={{ 
                      color: 'text.secondary', 
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': { 
                        color: theme.palette.primary.main, 
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.05)
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
<Grid size={{ xs: 12, md: 7 }}>
              <Card variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, height: '100%', bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Request an Enterprise Demo</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Complete the fields below to schedule a live walkthrough with our compliance engineers.</Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Company Name"
                            variant="outlined"
                            error={!!errors.companyName}
                            helperText={errors.companyName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="businessEmail"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Business Email"
                            type="email"
                            variant="outlined"
                            error={!!errors.businessEmail}
                            helperText={errors.businessEmail?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            placeholder="+1 (555) 0199"
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="companySize"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            select
                            label="Company Size"
                            variant="outlined"
                            error={!!errors.companySize}
                            helperText={errors.companySize?.message}
                          >
                            <MenuItem value="1-10">1 - 10 employees</MenuItem>
                            <MenuItem value="11-50">11 - 50 employees</MenuItem>
                            <MenuItem value="51-200">51 - 200 employees</MenuItem>
                            <MenuItem value="201-500">201 - 500 employees</MenuItem>
                            <MenuItem value="501-1000">501 - 1000 employees</MenuItem>
                            <MenuItem value="1000+">1000+ employees</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            multiline
                            rows={4}
                            label="Message"
                            variant="outlined"
                            placeholder="Tell us about your organization's GRC or procurement requirements..."
                            error={!!errors.message}
                            helperText={errors.message?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large" 
                    disabled={isSubmittingForm}
                    sx={{ py: 1.8, fontSize: '1rem', fontWeight: 700 }}
                  >
                    {isSubmittingForm ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Scheduling Demo...</span>
                      </Box>
                    ) : 'Request Enterprise Demo'}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
<Box sx={{ bgcolor: '#0F172A', py: { xs: 3, md: 3 }, mt: 'auto', borderTop: `1px solid ${alpha('#94A3B8', 0.15)}` }}>
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, bgcolor: alpha('#94A3B8', 0.1), borderRadius: 1.5, display: 'flex' }}>
              <Business sx={{ fontSize: 24, color: theme.palette.primary.main }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#E5E7EB', letterSpacing: '-0.02em' }}>Meridian</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
            © {new Date().getFullYear()} Meridian Enterprise Solutions. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography variant="body2" onClick={() => navigate('/privacy')} sx={{ color: '#94A3B8', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: theme.palette.primary.main } }}>Privacy Policy</Typography>
            <Typography variant="body2" onClick={() => navigate('/terms')} sx={{ color: '#94A3B8', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { color: theme.palette.primary.main } }}>Terms of Service</Typography>
          </Box>
        </Container>
      </Box>
<Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LandingPage;
