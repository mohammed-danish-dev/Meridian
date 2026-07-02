import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, useTheme, alpha } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color = '#1565C0', trend, trendDirection = 'up' }) => {
  const theme = useTheme();
  
  const getTrendColor = () => {
    if (trendDirection === 'up') return theme.palette.success.main;
    if (trendDirection === 'down') return theme.palette.error.main;
    return theme.palette.text.secondary;
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') return <TrendingUp fontSize="small" />;
    if (trendDirection === 'down') return <TrendingDown fontSize="small" />;
    return <TrendingFlat fontSize="small" />;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, mb: 1, wordWrap: 'break-word' }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', wordWrap: 'break-word' }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: alpha(color, 0.1), color: color, width: 48, height: 48, borderRadius: 2, flexShrink: 0 }}>
            {icon}
          </Avatar>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: getTrendColor(), mr: 1, fontWeight: 600 }}>
              {getTrendIcon()}
              <Typography variant="body2" component="span" sx={{ ml: 0.5, fontWeight: 'inherit' }}>
                {trend}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              vs last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
