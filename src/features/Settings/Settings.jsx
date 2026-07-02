import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Switch, Divider, Avatar, useTheme, Tabs, Tab, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, updateUserPassword } from '../../store/slices/authSlice';
import { useTranslation } from '../../hooks/useTranslation';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`settings-tabpanel-${index}`} aria-labelledby={`settings-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const passwords = useSelector((state) => state.auth.passwords) || {};
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    phone: user?.phone || '',
    designation: user?.designation || '',
  });

  const [avatar, setAvatar] = useState(user?.avatar);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState(user?.language || localStorage.getItem('appLanguage') || 'en');
  const [timezone, setTimezone] = useState(user?.timezone || 'utc');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showMessage = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        phone: user.phone || '',
        designation: user.designation || '',
      });
      setAvatar(user.avatar);
      setLanguage(user.language || 'en');
      setTimezone(user.timezone || 'utc');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(undefined);
  };

  const handleSaveProfile = () => {
    if (user) {
      dispatch(updateProfile({
        ...user,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        phone: formData.phone,
        designation: formData.designation,
        avatar: avatar,
      }));
      showMessage('Profile updated successfully.');
    }
  };

  const handleUpdatePassword = () => {
    if (!user) return;
    const expectedPassword = passwords[user.email] || 'password123';

    if (!currentPassword) {
      showMessage('Please enter your current password.', 'error');
      return;
    }
    if (currentPassword !== expectedPassword) {
      showMessage('Current password is incorrect.', 'error');
      return;
    }
    if (!newPassword) {
      showMessage('New password cannot be empty.', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showMessage('New password must be at least 8 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage('New password and confirm password do not match.', 'error');
      return;
    }

    dispatch(updateUserPassword({ email: user.email, newPassword }));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showMessage('Password updated successfully.');
  };

  const handleSavePreferences = () => {
    if (user) {
      dispatch(updateProfile({
        ...user,
        language,
        timezone,
      }));
      localStorage.setItem('appLanguage', language);
      showMessage(t('Preferences saved successfully.'));
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>Account Settings</Typography>
        <Typography variant="body1" color="text.secondary">Manage your profile, security, and application preferences.</Typography>
      </Box>

      <Paper elevation={0} sx={{ width: '100%', borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0F172A', px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs" variant="scrollable" scrollButtons="auto" sx={{ '& .MuiTab-root': { py: 2.5, fontWeight: 600, fontSize: '0.9rem' } }}>
            <Tab label="Profile Info" />
            <Tab label="Security" />
            <Tab label="Preferences" />
            <Tab label="Notifications" />
          </Tabs>
        </Box>
        
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <CustomTabPanel value={tabValue} index={0}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, textAlign: 'center', p: 3, height: '100%' }}>
                  <Avatar 
                    src={avatar} 
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 3, bgcolor: theme.palette.primary.main, fontSize: 48, boxShadow: theme.shadows[2] }}
                  >
                    {!avatar && user?.name?.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{formData.name || user?.name}</Typography>
                  <Typography variant="body2" color="primary" sx={{ mb: 3, fontWeight: 600 }}>{user?.role}</Typography>
                  
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload">
                    <Button variant="outlined" component="span" fullWidth sx={{ mb: 1 }}>
                      Upload New Avatar
                    </Button>
                  </label>
                  <Button variant="text" color="error" fullWidth onClick={handleRemoveAvatar}>Remove Avatar</Button>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Personal Information</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="System Role" value={user?.role || ''} disabled helperText="Contact system administrator to change roles." slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} slotProps={{ inputLabel: { shrink: true } }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="contained" onClick={handleSaveProfile} size="large" sx={{ px: 4 }}>Save Changes</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Security Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Ensure your account is using a long, random password to stay secure.</Typography>
            
            <Grid container spacing={4} sx={{ maxWidth: 800 }}>
              <Grid size={{ xs: 12 }}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>Change Password</Typography>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12 }}>
                        <TextField 
                          fullWidth 
                          label="Current Password" 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="New Password" 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField 
                          fullWidth 
                          label="Confirm New Password" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button variant="contained" color="primary" onClick={handleUpdatePassword}>Update Password</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Active Sessions</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Manage and log out your active sessions on other browsers and devices.</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Chrome on MacOS</Typography>
                        <Typography variant="caption" color="text.secondary">IP: 192.168.1.1 • Last active: Just now (This session)</Typography>
                      </Box>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>Active</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <Button variant="outlined" color="error">Revoke All Other Sessions</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Appearance & Localization</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Customize your interface preferences.</Typography>
            
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, maxWidth: 800 }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      select 
                      fullWidth 
                      label="Language" 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField 
                      select 
                      fullWidth 
                      label="Timezone" 
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                    >
                      <option value="utc">UTC</option>
                      <option value="pst">Pacific Time (US)</option>
                      <option value="est">Eastern Time (US)</option>
                      <option value="cet">Central European Time</option>
                    </TextField>
                  </Grid>
                  
                  <Grid size={{ xs: 12 }}>
                    <Button variant="contained" onClick={handleSavePreferences}>Save Changes</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>Notification Preferences</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Decide how you want to be notified about enterprise activities.</Typography>
            
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, maxWidth: 800 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Email: Procurement Approvals</Typography>
                    <Typography variant="caption" color="text.secondary">Get notified when a procurement requires your approval.</Typography>
                  </Box>
                  <Switch defaultChecked color="primary" />
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Email: Vendor Risk Alerts</Typography>
                    <Typography variant="caption" color="text.secondary">Immediate alerts for critical vendor risk changes.</Typography>
                  </Box>
                  <Switch defaultChecked color="primary" />
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Push: System Updates</Typography>
                    <Typography variant="caption" color="text.secondary">In-app notifications for platform updates and maintenance.</Typography>
                  </Box>
                  <Switch defaultChecked color="primary" />
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Weekly Digest Summary</Typography>
                    <Typography variant="caption" color="text.secondary">A weekly email summarizing enterprise metrics and open tasks.</Typography>
                  </Box>
                  <Switch color="primary" />
                </Box>
              </CardContent>
            </Card>
          </CustomTabPanel>
        </Box>
      </Paper>
<Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
