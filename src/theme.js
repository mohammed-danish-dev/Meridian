import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0176D3' : '#42A5F5',
      dark: mode === 'light' ? '#014486' : '#1565C0',
      light: mode === 'light' ? '#8FC8F8' : '#90CAF9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#475467' : '#94A3B8',
      contrastText: '#ffffff',
    },
    success: {
      main: '#04844B',
      light: '#4CAF50',
    },
    warning: {
      main: '#FFB75D',
      dark: '#E07706',
    },
    error: {
      main: '#C23934',
    },
    info: {
      main: '#0176D3',
    },
    background: {
      default: mode === 'light' ? '#F3F4F6' : '#0B0F19',
      paper: mode === 'light' ? '#FFFFFF' : '#111827',
    },
    text: {
      primary: mode === 'light' ? '#111827' : '#F1F5F9',
      secondary: mode === 'light' ? '#4B5563' : '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: '2.5rem' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em', fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.875rem' },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    mode === 'light' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : '0 1px 2px 0 rgb(0 0 0 / 0.5)',
    mode === 'light' ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
    mode === 'light' ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' : '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
    mode === 'light' ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    mode === 'light' ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' : '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
    mode === 'light' ? '0 25px 50px -12px rgb(0 0 0 / 0.25)' : '0 25px 50px -12px rgb(0 0 0 / 0.75)',
    ...Array(18).fill(mode === 'light' ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : '0 4px 6px -1px rgb(0 0 0 / 0.5)')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          fontWeight: 600,
          boxShadow: 'none',
          padding: '6px 16px',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: mode === 'light' ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
          border: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #1E293B',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
        title: {
          fontSize: '1.125rem',
          fontWeight: 600,
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          }
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#111827',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: mode === 'light' ? '#64748B' : '#94A3B8',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: mode === 'light' ? '#F8FAFC' : '#1E293B',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #1E293B',
            backgroundColor: mode === 'light' ? '#F8FAFC' : '#1E293B',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #1E293B',
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#111827',
          color: mode === 'light' ? '#1E293B' : '#F1F5F9',
          boxShadow: mode === 'light' ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
          borderBottom: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #1E293B',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#0F172A' : '#0B0F19',
          color: '#F8FAFC',
          borderRight: 'none',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#94A3B8',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? '#E2E8F0' : '#1E293B',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        }
      }
    }
  },
});
