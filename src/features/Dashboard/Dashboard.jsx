import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardHeader, Divider, Button, useTheme, Avatar, alpha, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import StatCard from './StatCard';
import { ShoppingCart, Warning, VerifiedUser, Business, Assessment, ArrowForwardIos, Settings, PictureAsPdf, GridOn, TableChart } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { exportToCSV, exportToExcel, exportToPDF } from '../../services/exportUtils';
import { formatCurrency } from '../../services/formatUtils';
import { getLocalDateString, getLocalTimeString } from '../../services/dateUtils';
import ActivityDetailsDialog from './ActivityDetailsDialog';
import { useTranslation } from '../../hooks/useTranslation';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const procurements = useSelector((state) => state.procurement.items);
  const vendors = useSelector((state) => state.vendors.items);
  const risks = useSelector((state) => state.risk.items);
  const compliance = useSelector((state) => state.compliance?.items || []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedActivity, setSelectedActivity] = React.useState(null);
  const [activityDialogOpen, setActivityDialogOpen] = React.useState(false);

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const COLORS = [
    theme.palette.primary.main, 
    theme.palette.success.main, 
    theme.palette.warning.main, 
    theme.palette.error.main, 
    theme.palette.info.main
  ];
  const isEmployee = user?.role === 'Employee';
  const userProcurements = React.useMemo(() => isEmployee ? procurements.filter(p => p.requesterId === user?.id) : procurements, [isEmployee, procurements, user?.id]);
  
  const { pendingRequests, approvedRequests, rejectedRequests, totalRequests, totalSpend, activeVendors, criticalRisks, complianceIssues } = React.useMemo(() => {
    const pendingRequests = userProcurements.filter(p => p.status === 'Pending Approval').length;
    const approvedRequests = userProcurements.filter(p => p.status === 'Approved').length;
    const rejectedRequests = userProcurements.filter(p => p.status === 'Rejected').length;
    const totalRequests = userProcurements.length;
    const totalSpend = userProcurements.reduce((sum, p) => p.status === 'Approved' ? sum + p.amount : sum, 0);
    const activeVendors = vendors.filter(v => v.status === 'Active').length;
    const criticalRisks = risks.filter(r => r.level === 'Critical' && r.status === 'Open').length;
    const complianceIssues = compliance.filter(c => c.status !== 'Compliant').length;
    return { pendingRequests, approvedRequests, rejectedRequests, totalRequests, totalSpend, activeVendors, criticalRisks, complianceIssues };
  }, [userProcurements, vendors, risks, compliance]);

  const kpiCards = React.useMemo(() => {
    const list = [
      {
        title: isEmployee ? "My Total Requests" : "Total Requests",
        value: totalRequests,
        icon: <ShoppingCart />,
        color: theme.palette.info.main,
        trend: "5%",
        trendDirection: "up"
      },
      {
        title: isEmployee ? "My Pending Requests" : "Pending Approvals",
        value: pendingRequests,
        icon: <ShoppingCart />,
        color: theme.palette.warning.main,
        trend: "12%",
        trendDirection: "up"
      },
      {
        title: isEmployee ? "My Approved Requests" : "Approved Requests",
        value: approvedRequests,
        icon: <ShoppingCart />,
        color: theme.palette.success.main,
        trend: "8%",
        trendDirection: "up"
      },
      {
        title: isEmployee ? "My Rejected Requests" : "Rejected Requests",
        value: rejectedRequests,
        icon: <ShoppingCart />,
        color: theme.palette.error.main,
        trend: "2%",
        trendDirection: "down"
      }
    ];

    if (!isEmployee) {
      list.push(
        {
          title: "Active Vendors",
          value: activeVendors,
          icon: <Business />,
          color: theme.palette.primary.main,
          trend: "2%",
          trendDirection: "up"
        },
        {
          title: "Critical Risks",
          value: criticalRisks,
          icon: <Warning />,
          color: theme.palette.error.main,
          trend: "1",
          trendDirection: "neutral"
        },
        {
          title: "Compliance Issues",
          value: complianceIssues,
          icon: <VerifiedUser />,
          color: theme.palette.error.main,
          trend: "4%",
          trendDirection: "down"
        }
      );
    } else {
      list.push({
        title: "My Approved Spend",
        value: formatCurrency(totalSpend),
        icon: <ShoppingCart />,
        color: theme.palette.success.main,
        trend: "5.2%",
        trendDirection: "down"
      });
    }
    return list;
  }, [isEmployee, totalRequests, pendingRequests, approvedRequests, rejectedRequests, activeVendors, criticalRisks, complianceIssues, totalSpend, theme]);

  const dynamicActivities = React.useMemo(() => {
    let activities = [];
    
    if (user?.role === 'Employee') {
      activities = userProcurements.slice(0, 5).map(p => ({
        id: `act_${p.id}`,
        title: p.status === 'Approved' ? 'Request Approved' : p.status === 'Rejected' ? 'Request Rejected' : 'Created Procurement Request',
        desc: `Procurement: ${p.title}`,
        date: getLocalDateString(p.updatedAt),
        time: getLocalTimeString(p.updatedAt),
        icon: <ShoppingCart fontSize="small" />,
        color: p.status === 'Approved' ? theme.palette.success.main : p.status === 'Rejected' ? theme.palette.error.main : theme.palette.primary.main,
        module: 'Procurement',
        status: p.status,
        priority: 'Normal',
        userName: user.name,
        userRole: user.role,
        longDesc: `Your procurement request "${p.title}" was ${p.status.toLowerCase()}. Details: ${p.description}`,
        notes: `Amount: ${formatCurrency(p.amount)} for department ${p.department}.`
      }));
    } else if (user?.role === 'Manager') {
      activities = procurements.slice(0, 3).map(p => ({
        id: `act_p_${p.id}`,
        title: p.status === 'Approved' ? 'Approved Request' : p.status === 'Rejected' ? 'Rejected Request' : 'Assigned Request',
        desc: `Procurement: ${p.title}`,
        date: getLocalDateString(p.updatedAt),
        time: getLocalTimeString(p.updatedAt),
        icon: <ShoppingCart fontSize="small" />,
        color: p.status === 'Approved' ? theme.palette.success.main : p.status === 'Rejected' ? theme.palette.error.main : theme.palette.warning.main,
        module: 'Procurement',
        status: p.status,
        priority: p.amount > 10000 ? 'High' : 'Normal',
        userName: user.name,
        userRole: user.role,
        longDesc: `You ${p.status === 'Approved' ? 'approved' : 'reviewed'} the procurement request "${p.title}".`,
        notes: `Amount: ${formatCurrency(p.amount)}. Requested by user ID: ${p.requesterId}`
      }));
      activities = [...activities, ...vendors.slice(0, 2).map(v => ({
        id: `act_v_${v.id}`,
        title: 'Vendor Updated',
        desc: `Vendor: ${v.name}`,
        date: getLocalDateString(new Date()),
        time: getLocalTimeString(new Date()),
        icon: <Business fontSize="small" />,
        color: theme.palette.info.main,
        module: 'Vendors',
        status: v.status,
        priority: v.riskLevel === 'High' ? 'High' : 'Normal',
        userName: user.name,
        userRole: user.role,
        longDesc: `Vendor "${v.name}" status or details were updated.`,
        notes: `Category: ${v.category}, Current Status: ${v.status}`
      }))];
    } else if (user?.role === 'Compliance Officer') {
      activities = compliance.slice(0, 3).map(c => ({
        id: `act_c_${c.id}`,
        title: c.status === 'Compliant' ? 'Compliance Verified' : c.status === 'Expired' ? 'Certification Expired' : 'Compliance Updated',
        desc: `Policy: ${c.title}`,
        date: getLocalDateString(new Date()),
        time: getLocalTimeString(new Date()),
        icon: <VerifiedUser fontSize="small" />,
        color: c.status === 'Compliant' ? theme.palette.success.main : theme.palette.error.main,
        module: 'Compliance',
        status: c.status,
        priority: c.status === 'Expired' ? 'High' : 'Normal',
        userName: user.name,
        userRole: user.role,
        longDesc: `Compliance record "${c.title}" is currently marked as ${c.status}.`,
        notes: `Type: ${c.type}. Related Vendor ID: ${c.vendorId}`
      }));
      activities = [...activities, ...risks.slice(0, 2).map(r => ({
        id: `act_r_${r.id}`,
        title: 'Violation Detected',
        desc: `Risk: ${r.title}`,
        date: getLocalDateString(r.createdAt),
        time: getLocalTimeString(r.createdAt),
        icon: <Warning fontSize="small" />,
        color: theme.palette.error.main,
        module: 'Risk',
        status: r.status,
        priority: r.level,
        userName: user.name,
        userRole: user.role,
        longDesc: `A new ${r.level.toLowerCase()} level risk "${r.title}" was detected in the system.`,
        notes: `Category: ${r.category}, Status: ${r.status}`
      }))];
    } else if (user?.role === 'Auditor') {
      activities = [
        { id: 'a1', title: 'Audit Generated', desc: 'Financial Audit 2026', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Assessment fontSize="small" />, color: theme.palette.primary.main, module: 'Audit', status: 'Completed', priority: 'High', userName: user.name, userRole: user.role, longDesc: 'System automatically generated the annual Financial Audit report for 2026.', notes: 'All financial records verified without major discrepancies.' },
        { id: 'a2', title: 'Audit Reviewed', desc: 'Compliance Audit Q2', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Assessment fontSize="small" />, color: theme.palette.success.main, module: 'Audit', status: 'Reviewed', priority: 'Normal', userName: user.name, userRole: user.role, longDesc: 'You reviewed the Q2 Compliance Audit.', notes: 'Minor issues found in vendor certifications.' },
        { id: 'a3', title: 'System Log Viewed', desc: 'Viewed Enterprise Logs', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Assessment fontSize="small" />, color: theme.palette.info.main, module: 'Audit', status: 'Viewed', priority: 'Low', userName: user.name, userRole: user.role, longDesc: 'You accessed the enterprise system logs for routine monitoring.', notes: 'No unusual activities detected.' },
        { id: 'a4', title: 'Audit Completed', desc: 'Vendor Risk Audit', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Assessment fontSize="small" />, color: theme.palette.success.main, module: 'Audit', status: 'Completed', priority: 'High', userName: user.name, userRole: user.role, longDesc: 'Vendor Risk Audit completed successfully across top 50 vendors.', notes: 'Report sent to Compliance Officer.' },
      ];
    } else if (user?.role === 'Administrator') {
      activities = [
        { id: 'a1', title: 'User Created', desc: 'Added new employee account', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <VerifiedUser fontSize="small" />, color: theme.palette.success.main, module: 'Users', status: 'Active', priority: 'Normal', userName: user.name, userRole: user.role, longDesc: 'A new user account was created and provisioned with Employee role access.', notes: 'Account ID: u90, Department: HR.' },
        { id: 'a2', title: 'System Configuration Updated', desc: 'Modified SSO Settings', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Settings fontSize="small" />, color: theme.palette.warning.main, module: 'Settings', status: 'Updated', priority: 'High', userName: user.name, userRole: user.role, longDesc: 'Single Sign-On (SSO) SAML configuration was updated to renew the certificate.', notes: 'Previous Status: Expiring, Current Status: Active.' },
        { id: 'a3', title: 'Vendor Added', desc: 'New enterprise vendor boarded', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <Business fontSize="small" />, color: theme.palette.info.main, module: 'Vendors', status: 'Under Review', priority: 'Normal', userName: user.name, userRole: user.role, longDesc: 'A new enterprise vendor profile was created in the system and is pending review.', notes: 'Category: Hardware.' },
        { id: 'a4', title: 'Role Assigned', desc: 'Assigned Compliance Officer role', date: getLocalDateString(new Date()), time: getLocalTimeString(new Date()), icon: <VerifiedUser fontSize="small" />, color: theme.palette.primary.main, module: 'Users', status: 'Completed', priority: 'High', userName: user.name, userRole: user.role, longDesc: 'Elevated privileges assigned to User ID u12 from Employee to Compliance Officer.', notes: 'Approved by security board.' },
      ];
    }

    return activities.slice(0, 4);
  }, [user, userProcurements, procurements, vendors, compliance, risks, theme]);
  const deptSpend = React.useMemo(() => Object.entries(
    procurements.reduce((acc, p) => {
      if (p.status === 'Approved') {
        acc[p.department] = (acc[p.department] || 0) + p.amount;
      }
      return acc;
    }, {})
  ).map(([name, spend]) => ({ name, spend })), [procurements]);

  const riskData = React.useMemo(() => Object.entries(
    risks.reduce((acc, r) => {
      acc[r.level] = (acc[r.level] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value })), [risks]);

  const vendorStatusData = React.useMemo(() => Object.entries(
    vendors.reduce((acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value })), [vendors]);
  const spendTimeline = [
    { name: 'Jan', spend: 4000 },
    { name: 'Feb', spend: 3000 },
    { name: 'Mar', spend: 2000 },
    { name: 'Apr', spend: 2780 },
    { name: 'May', spend: 1890 },
    { name: 'Jun', spend: 2390 },
    { name: 'Jul', spend: 3490 },
  ];

  const handleExport = (type) => {
    handleExportClose();
    const exportData = [
      { Category: 'KPI', Metric: 'Pending Approvals', Value: pendingRequests },
      { Category: 'KPI', Metric: 'Approved Spend', Value: formatCurrency(totalSpend) },
      { Category: 'KPI', Metric: 'Active Vendors', Value: activeVendors },
      { Category: 'KPI', Metric: 'Critical Risks', Value: criticalRisks },
      ...deptSpend.map(d => ({ Category: 'Department Spend', Metric: d.name, Value: formatCurrency(d.spend) })),
      ...riskData.map(r => ({ Category: 'Risk Distribution', Metric: r.name, Value: r.value })),
      ...vendorStatusData.map(v => ({ Category: 'Vendor Status', Metric: v.name, Value: v.value }))
    ];

    const columns = [
      { field: 'Category', headerName: 'Category' },
      { field: 'Metric', headerName: 'Metric' },
      { field: 'Value', headerName: 'Value' }
    ];

    const title = 'Executive Dashboard Summary';
    const filename = 'Executive_Dashboard_Report';

    if (type === 'csv') exportToCSV(exportData, filename, title, columns);
    else if (type === 'excel') exportToExcel(exportData, filename, title, columns);
    else exportToPDF(exportData, filename, title, columns);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>{t('Executive Dashboard')}</Typography>
          <Typography variant="body1" color="text.secondary">{t("Welcome back") + `, ${user?.name}. ` + t("Here's what's happening across the enterprise today.")}</Typography>
        </Box>
        <Box>
          {user?.role !== 'Employee' && (
            <>
              <Button variant="contained" startIcon={<Assessment />} onClick={handleExportClick} sx={{ py: 1.5, px: 3 }}>
                {t('Generate Report')}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleExportClose}>
                <MenuItem onClick={() => handleExport('pdf')}>
                  <ListItemIcon><PictureAsPdf fontSize="small" /></ListItemIcon>
                  <ListItemText>{t('Export as PDF')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleExport('excel')}>
                  <ListItemIcon><GridOn fontSize="small" /></ListItemIcon>
                  <ListItemText>{t('Export as Excel')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleExport('csv')}>
                  <ListItemIcon><TableChart fontSize="small" /></ListItemIcon>
                  <ListItemText>{t('Export as CSV')}</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiCards.map((card, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatCard 
              title={card.title} 
              value={card.value} 
              icon={card.icon} 
              color={card.color} 
              trend={card.trend} 
              trendDirection={card.trendDirection} 
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(user?.role === 'Manager' || user?.role === 'Administrator' || user?.role === 'Employee') && (
          <Grid size={{ xs: 12, md: user?.role === 'Employee' ? 12 : 8 }}>
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardHeader title={user?.role === 'Employee' ? "My Spend Analysis" : "Department Spend Analysis"} subheader="Fiscal Year 2026 Overview" />
              <Divider />
              <CardContent sx={{ height: 360 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptSpend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                    <RechartsTooltip cursor={{ fill: theme.palette.action.hover }} contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8, boxShadow: theme.shadows[4], color: theme.palette.text.primary }} formatter={(value) => formatCurrency(value)} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="spend" name="Spend" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {(user?.role === 'Compliance Officer' || user?.role === 'Auditor' || user?.role === 'Administrator' || user?.role === 'Manager') && (
          <Grid size={{ xs: 12, md: (user?.role === 'Manager' || user?.role === 'Administrator') ? 4 : 6 }}>
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardHeader title="Enterprise Risk Distribution" subheader="Active Risks by Severity" />
              <Divider />
              <CardContent sx={{ height: 360, display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8, color: theme.palette.text.primary }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3}>
        {(user?.role === 'Manager' || user?.role === 'Administrator' || user?.role === 'Compliance Officer' || user?.role === 'Auditor') && (
          <Grid size={{ xs: 12, md: (user?.role === 'Compliance Officer' || user?.role === 'Auditor') ? 12 : 4 }}>
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardHeader title="Vendor Status" subheader="Total Registered Vendors" />
              <Divider />
              <CardContent sx={{ height: 360, display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vendorStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vendorStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8, color: theme.palette.text.primary }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {(user?.role === 'Manager' || user?.role === 'Administrator' || user?.role === 'Employee') && (
          <Grid size={{ xs: 12, md: user?.role === 'Employee' ? 12 : 8 }}>
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardHeader title={user?.role === 'Employee' ? "My Spend Trend" : "Spend Trend"} subheader="Monthly Analysis" />
              <Divider />
              <CardContent sx={{ height: 360 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendTimeline} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value)} />
                    <RechartsTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 8, color: theme.palette.text.primary }} formatter={(value) => formatCurrency(value)} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Line type="monotone" name="Spend" dataKey="spend" stroke={theme.palette.success.main} activeDot={{ r: 8 }} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Quick Actions" />
            <Divider />
            <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {(user?.role === 'Employee' || user?.role === 'Manager' || user?.role === 'Administrator') && (
                <Button variant="contained" startIcon={<ShoppingCart />} onClick={() => navigate('/procurement')} sx={{ py: 1.5, px: 3, flex: '1 1 auto' }}>New Procurement</Button>
              )}
              {(user?.role === 'Manager' || user?.role === 'Administrator' || user?.role === 'Compliance Officer') && (
                <Button variant="outlined" startIcon={<Business />} onClick={() => navigate('/vendors')} sx={{ py: 1.5, px: 3, flex: '1 1 auto' }}>View Vendors</Button>
              )}
              {(user?.role === 'Compliance Officer' || user?.role === 'Administrator') && (
                <Button variant="outlined" startIcon={<Warning />} onClick={() => navigate('/risk')} sx={{ py: 1.5, px: 3, flex: '1 1 auto' }}>Report Risk</Button>
              )}
              {(user?.role === 'Auditor' || user?.role === 'Administrator') && (
                <Button variant="outlined" startIcon={<VerifiedUser />} onClick={() => navigate('/audit')} sx={{ py: 1.5, px: 3, flex: '1 1 auto' }}>Audit Log</Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Recent Activities" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              {dynamicActivities.map((act, i) => (
                <Box key={act.id} onClick={() => { setSelectedActivity(act); setActivityDialogOpen(true); }} sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: i !== dynamicActivities.length - 1 ? `1px solid ${theme.palette.divider}` : 'none', '&:hover': { bgcolor: 'action.hover' }, cursor: 'pointer' }}>
                  <Avatar sx={{ bgcolor: alpha(act.color, 0.1), color: act.color, width: 40, height: 40, mr: 2 }}>
                    {act.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{act.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{act.desc} - {act.date}</Typography>
                  </Box>
                  <ArrowForwardIos fontSize="small" color="action" sx={{ fontSize: 14 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <ActivityDetailsDialog open={activityDialogOpen} onClose={() => setActivityDialogOpen(false)} activity={selectedActivity} />
    </Box>
  );
};

export default Dashboard;
