import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Divider, useTheme, useMediaQuery, alpha, Tooltip } from '@mui/material';
import { Dashboard, ShoppingCart, Business, Warning, VerifiedUser, Assessment, Settings } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOpen } from '../store/slices/uiSlice';
import { useTranslation } from '../hooks/useTranslation';

const Sidebar = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', roles: ['Employee', 'Manager', 'Compliance Officer', 'Auditor', 'Administrator'] },
    { text: user?.role === 'Employee' ? 'My Procurement' : 'Procurement', icon: <ShoppingCart />, path: '/procurement', roles: ['Employee', 'Manager', 'Administrator'] },
    { text: 'Vendors', icon: <Business />, path: '/vendors', roles: ['Manager', 'Compliance Officer', 'Administrator'] },
    { text: 'Risk Center', icon: <Warning />, path: '/risk', roles: ['Administrator'] },
    { text: 'Compliance', icon: <VerifiedUser />, path: '/compliance', roles: ['Compliance Officer', 'Administrator'] },
    { text: 'Audit Center', icon: <Assessment />, path: '/audit', roles: ['Auditor', 'Administrator'] },
    { text: 'Reports', icon: <Assessment />, path: '/reports', roles: ['Manager', 'Compliance Officer', 'Auditor', 'Administrator'] },
  ];

  const allowedMenuItems = menuItems.filter(item => user && item.roles.includes(user.role));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };

  const expandedWidth = 280;
  const collapsedWidth = 80;

  const isCompact = !isMobile && !sidebarOpen;
  
  const currentWidth = isMobile
    ? expandedWidth
    : (sidebarOpen ? expandedWidth : collapsedWidth);

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper', overflowX: 'hidden' }}>
      <Box sx={{ p: isCompact ? 1.5 : 3, display: 'flex', alignItems: 'center', justifyContent: isCompact ? 'center' : 'flex-start' }}>
        <Business sx={{ mr: isCompact ? 0 : 1.5, color: 'primary.main', fontSize: 28 }} />
        {!isCompact && (
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.05em', color: 'text.primary' }}>
            {t('Meridian', 'Meridian')}
          </Typography>
        )}
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, px: isCompact ? 1 : 2, pt: 2 }}>
        {!isCompact && (
          <Typography variant="overline" sx={{ px: 2, pb: 1, display: 'block', color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em' }}>
            {t('MAIN MENU', 'MAIN MENU')}
          </Typography>
        )}
        {allowedMenuItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          const buttonContent = (
            <ListItemButton
              selected={active}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 1.5,
                px: isCompact ? 1 : 2,
                justifyContent: isCompact ? 'center' : 'flex-start',
                color: active ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                  }
                },
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                  color: theme.palette.mode === 'light' ? 'text.primary' : 'text.primary',
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.mode === 'light' ? 'text.primary' : 'text.primary',
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: isCompact ? 'auto' : 40, color: active ? 'primary.main' : 'text.secondary', transition: 'color 0.2s', justifyContent: 'center' }}>
                {item.icon}
              </ListItemIcon>
              {!isCompact && (
                <ListItemText primary={t(item.text, item.text)} sx={{ '& .MuiListItemText-primary': { fontWeight: active ? 600 : 500, fontSize: '0.9rem' } }} />
              )}
            </ListItemButton>
          );

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              {isCompact ? (
                <Tooltip title={t(item.text, item.text)} placement="right" arrow>
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              )}
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List sx={{ px: isCompact ? 1 : 2, py: 2 }}>
        <ListItem disablePadding>
          {isCompact ? (
            <Tooltip title={t('Settings', 'Settings')} placement="right" arrow>
              <ListItemButton 
                sx={{ 
                  borderRadius: 1.5, 
                  px: isCompact ? 1 : 2,
                  justifyContent: isCompact ? 'center' : 'flex-start',
                  color: location.pathname === '/settings' ? 'primary.main' : 'text.secondary',
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                    color: 'text.primary',
                    '& .MuiListItemIcon-root': {
                      color: 'text.primary',
                    }
                  }
                }} 
                onClick={() => handleNavigation('/settings')} 
                selected={location.pathname === '/settings'}
              >
                <ListItemIcon sx={{ minWidth: isCompact ? 'auto' : 40, color: location.pathname === '/settings' ? 'primary.main' : 'text.secondary', transition: 'color 0.2s', justifyContent: 'center' }}><Settings /></ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton 
              sx={{ 
                borderRadius: 1.5, 
                px: isCompact ? 1 : 2,
                justifyContent: isCompact ? 'center' : 'flex-start',
                color: location.pathname === '/settings' ? 'primary.main' : 'text.secondary',
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
                '&:hover': {
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                  color: 'text.primary',
                  '& .MuiListItemIcon-root': {
                    color: 'text.primary',
                  }
                }
              }} 
              onClick={() => handleNavigation('/settings')} 
              selected={location.pathname === '/settings'}
            >
              <ListItemIcon sx={{ minWidth: isCompact ? 'auto' : 40, color: location.pathname === '/settings' ? 'primary.main' : 'text.secondary', transition: 'color 0.2s', justifyContent: 'center' }}><Settings /></ListItemIcon>
              <ListItemText primary={t('Settings', 'Settings')} sx={{ '& .MuiListItemText-primary': { fontWeight: location.pathname === '/settings' ? 600 : 500, fontSize: '0.9rem' } }} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box 
      component="nav" 
      sx={{ 
        width: isMobile ? 0 : currentWidth, 
        flexShrink: 0, 
        transition: theme.transitions.create('width', { 
          easing: theme.transitions.easing.sharp, 
          duration: theme.transitions.duration.enteringScreen 
        }) 
      }}
    >
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? sidebarOpen : true}
        onClose={() => dispatch(setSidebarOpen(false))}
        sx={{
          '& .MuiDrawer-paper': { 
            width: currentWidth, 
            boxSizing: 'border-box', 
            borderRight: '1px solid', 
            borderColor: 'divider',
            bgcolor: 'background.paper',
            position: isMobile ? 'fixed' : 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            height: '100vh',
            transition: theme.transitions.create('width', { 
              easing: theme.transitions.easing.sharp, 
              duration: theme.transitions.duration.enteringScreen 
            }),
            overflowX: 'hidden'
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
