import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Menu, MenuItem, Box, useTheme, Breadcrumbs, Link, alpha } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, DarkMode, LightMode, KeyboardArrowRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleTheme } from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { markAsRead, markAllAsRead } from '../store/slices/notificationSlice';
import { formatDistanceToNow } from 'date-fns';
import { Info, Warning, Error as ErrorIcon, CheckCircle } from '@mui/icons-material';
import GlobalSearch from './GlobalSearch';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { themeMode } = useSelector((state) => state.ui);
  const notifications = useSelector((state) => state.notifications.items);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNotifMenu = (event) => setNotifAnchorEl(event.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);
  
  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate('/login');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <Warning color="warning" />;
      case 'error': return <ErrorIcon color="error" />;
      case 'success': return <CheckCircle color="success" />;
      default: return <Info color="info" />;
    }
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => dispatch(toggleSidebar())} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
          <Breadcrumbs separator={<KeyboardArrowRight fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" sx={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }} onClick={() => {
              if (!user) {
                navigate('/');
              } else {
                switch(user.role) {
                  case 'Employee': navigate('/dashboard'); break;
                  case 'Manager': navigate('/procurement'); break;
                  case 'Compliance Officer': navigate('/compliance'); break;
                  case 'Auditor': navigate('/audit'); break;
                  case 'Administrator': navigate('/dashboard'); break;
                  default: navigate('/dashboard');
                }
              }
            }}>
              Home
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const title = value.charAt(0).toUpperCase() + value.slice(1);
              return last ? (
                <Typography color="text.primary" key={value} sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {title}
                </Typography>
              ) : (
                <Link underline="hover" color="inherit" key={value} sx={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }} onClick={() => navigate(`/${pathnames.slice(0, index + 1).join('/')}`)}>
                  {title}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>

        <GlobalSearch />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())} size="small" sx={{ bgcolor: theme.palette.mode === 'light' ? alpha('#0F172A', 0.04) : alpha('#FFFFFF', 0.05) }}>
            {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
          
          <IconButton color="inherit" onClick={handleNotifMenu} size="small" sx={{ bgcolor: theme.palette.mode === 'light' ? alpha('#0F172A', 0.04) : alpha('#FFFFFF', 0.05) }}>
            <Badge badgeContent={unreadCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 600 } }}>
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
          
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { width: 360, maxHeight: 500 } } }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Notifications</Typography>
              {unreadCount > 0 && (
                <Typography 
                  variant="body2" 
                  color="primary" 
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => dispatch(markAllAsRead())}
                >
                  Mark all as read
                </Typography>
              )}
            </Box>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {notifications.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography color="text.secondary">No notifications</Typography>
                </Box>
              ) : (
                notifications.map((n) => (
                  <MenuItem 
                    key={n.id} 
                    onClick={() => dispatch(markAsRead(n.id))}
                    sx={{ 
                      py: 1.5, 
                      px: 2, 
                      borderBottom: 1, 
                      borderColor: 'divider',
                      backgroundColor: n.read ? 'transparent' : alpha(theme.palette.primary.main, 0.05),
                      whiteSpace: 'normal'
                    }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>{getNotificationIcon(n.type)}</Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: n.read ? 400 : 600 }}>{n.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </Typography>
                    </Box>
                    {!n.read && (
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', ml: 1 }} />
                    )}
                  </MenuItem>
                ))
              )}
            </Box>
          </Menu>

          <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
            <Avatar src={user?.avatar || undefined} sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 180 }}>
              <Avatar src={user?.avatar || undefined} sx={{ width: 36, height: 36, bgcolor: theme.palette.primary.main }}>
                {user?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>{user?.name}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
              </Box>
            </Box>
            <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Profile</MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
