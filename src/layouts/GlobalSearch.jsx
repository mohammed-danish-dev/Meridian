import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase, alpha, styled, Popover, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Chip, useTheme } from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Business, Warning, VerifiedUser, Assessment, Notifications as NotificationsIcon, Person, Description } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mockAuditLogs, mockUsers } from '../mocks/dataGenerator';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'light' ? alpha('#0F172A', 0.04) : alpha('#FFFFFF', 0.05),
  border: `1px solid ${theme.palette.mode === 'light' ? alpha('#0F172A', 0.08) : alpha('#FFFFFF', 0.08)}`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? alpha('#0F172A', 0.06) : alpha('#FFFFFF', 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '130px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '300px',
    maxWidth: 'none',
  },
  transition: 'all 0.2s ease-in-out',
  '&:focus-within': {
    width: '100%',
    maxWidth: '180px',
    [theme.breakpoints.up('sm')]: {
      width: '350px',
      maxWidth: 'none',
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: theme.palette.primary.main,
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.875rem',
  },
}));

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const procurements = useSelector((state) => state.procurement.items);
  const vendors = useSelector((state) => state.vendors.items);
  const risks = useSelector((state) => state.risk.items);
  const compliance = useSelector((state) => state.compliance.items);
  const notifications = useSelector((state) => state.notifications.items);

  const role = user?.role;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0 && searchRef.current) {
      setAnchorEl(searchRef.current);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  const getResults = () => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    let results = [];

    const matches = (str) => str?.toLowerCase().includes(term);

    const canViewProcurement = ['Employee', 'Manager', 'Administrator'].includes(role || '');
    const canViewVendors = ['Manager', 'Compliance Officer', 'Administrator'].includes(role || '');
    const canViewRisk = ['Administrator'].includes(role || '');
    const canViewCompliance = ['Compliance Officer', 'Administrator'].includes(role || '');
    const canViewAudit = ['Auditor', 'Administrator'].includes(role || '');
    const canViewReports = ['Manager', 'Compliance Officer', 'Auditor', 'Administrator'].includes(role || '');

    if (canViewProcurement) {
      procurements.forEach(p => {
        if (matches(p.title) || matches(p.id) || matches(p.status) || matches(p.department)) {
          results.push({
            id: p.id,
            module: 'Procurement',
            title: p.title,
            description: p.department,
            status: p.status,
            icon: <ShoppingCart />,
            path: '/procurement'
          });
        }
      });
    }

    if (canViewVendors) {
      vendors.forEach(v => {
        if (matches(v.name) || matches(v.id) || matches(v.status) || matches(v.category)) {
          results.push({
            id: v.id,
            module: 'Vendors',
            title: v.name,
            description: v.category,
            status: v.status,
            icon: <Business />,
            path: '/vendors'
          });
        }
      });
    }

    if (canViewRisk) {
      risks.forEach(r => {
        if (matches(r.title) || matches(r.id) || matches(r.level) || matches(r.status)) {
          results.push({
            id: r.id,
            module: 'Risk Center',
            title: r.title,
            description: r.level + ' Risk',
            status: r.status,
            icon: <Warning />,
            path: '/risk'
          });
        }
      });
    }

    if (canViewCompliance) {
      compliance.forEach(c => {
        if (matches(c.title) || matches(c.id) || matches(c.status) || matches(c.type)) {
          results.push({
            id: c.id,
            module: 'Compliance',
            title: c.title,
            description: c.type,
            status: c.status,
            icon: <VerifiedUser />,
            path: '/compliance'
          });
        }
      });
    }

    if (canViewAudit) {
      mockAuditLogs.forEach(a => {
        if (matches(a.action) || matches(a.id) || matches(a.module) || matches(a.details)) {
          results.push({
            id: a.id,
            module: 'Audit Logs',
            title: a.action,
            description: a.module,
            icon: <Assessment />,
            path: '/audit'
          });
        }
      });
    }

    notifications.forEach(n => {
      if (matches(n.title) || matches(n.message) || matches(n.id)) {
        results.push({
          id: n.id,
          module: 'Notifications',
          title: n.title,
          description: n.message,
          icon: <NotificationsIcon />,
          path: '/dashboard'
        });
      }
    });

    if (canViewReports) {
      const reports = ['Executive Dashboard Summary', 'Vendor Performance Index', 'Enterprise Risk Posture', 'Procurement Spend Analysis', 'Compliance Audit Overview'];
      reports.forEach(r => {
        if (matches(r)) {
          results.push({
            id: `rep_${r}`,
            module: 'Reports',
            title: r,
            description: 'Enterprise Report',
            icon: <Description />,
            path: '/reports'
          });
        }
      });
    }

    if (role === 'Administrator') {
      mockUsers.forEach(u => {
        if (matches(u.name) || matches(u.email) || matches(u.role) || matches(u.department)) {
          results.push({
            id: u.id,
            module: 'Users',
            title: u.name,
            description: `${u.role} - ${u.department}`,
            icon: <Person />,
            path: '/settings'
          });
        }
      });
    }

    return results.slice(0, 8);
  };

  const results = getResults();

  const handleResultClick = (path) => {
    navigate(path);
    setAnchorEl(null);
    setSearchTerm('');
  };

  return (
    <>
      <SearchContainer ref={searchRef}>
        <SearchIconWrapper>
          <SearchIcon fontSize="small" />
        </SearchIconWrapper>
        <StyledInputBase 
          placeholder="Search anything... (Ctrl+K)" 
          inputProps={{ 'aria-label': 'search' }} 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              width: searchRef.current?.offsetWidth || 350,
              mt: 1,
              borderRadius: 2,
              boxShadow: theme.shadows[4],
              maxHeight: 400,
              overflow: 'auto',
              border: `1px solid ${theme.palette.divider}`
            }
          }
        }}
      >
        {results.length > 0 ? (
          <List sx={{ p: 0 }}>
            {results.map((res, index) => (
              <ListItem 
                key={res.id} 
                onClick={() => handleResultClick(res.path)}
                sx={{ 
                  cursor: 'pointer',
                  borderBottom: index !== results.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                    {res.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  disableTypography
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{res.title}</Typography>
                      {res.status && <Chip label={res.status} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />}
                    </Box>
                  } 
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '70%' }}>{res.description}</Typography>
                      <Typography variant="caption" color="primary">{res.module}</Typography>
                    </Box>
                  } 
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">No Results Found</Typography>
          </Box>
        )}
      </Popover>
    </>
  );
};

export default GlobalSearch;
