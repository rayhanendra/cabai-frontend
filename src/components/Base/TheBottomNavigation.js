import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import { HomeRounded, WarehouseRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import IconPenjualan from 'public/images/icons/IconPenjualan';
import theme from 'themes/theme';

const TheBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function getPageIndex(route) {
    switch (route) {
      case '/':
        return 0;
      case '/stok':
        return 1;
      case '/penjualan':
        return 2;
      case '/riwayat':
        return 3;
      default:
        return 0;
    }
  }

  const value = getPageIndex(location.pathname);

  const actions = [
    { label: 'Beranda', icon: <HomeRounded />, link: () => navigate('/') },
    { label: 'Stok', icon: <WarehouseRounded />, link: () => navigate('/stok') },
    {
      label: 'Penjualan',
      icon: <IconPenjualan />,
      link: () => navigate('/penjualan')
    },
    { label: 'Riwayat', icon: <RestoreIcon />, link: () => navigate('/riwayat') }
  ];

  return (
    <Paper
      square
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: theme.palette.dark.main
      }}>
      <BottomNavigation sx={{ backgroundColor: 'inherit' }} showLabels value={value}>
        {actions.map((action, index) => (
          <BottomNavigationAction
            key={index}
            label={action.label}
            icon={action.icon}
            onClick={action.link}
            sx={{
              color: 'white',
              opacity: 0.7,
              '&.Mui-selected': {
                color: theme.palette.optional.contrastText,
                opacity: 1,
                backgroundColor: theme.palette.green.main
              }
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default TheBottomNavigation;