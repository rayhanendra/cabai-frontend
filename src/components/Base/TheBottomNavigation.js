import { BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import React from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import { HomeRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import IconPenjualan from 'public/images/icons/IconPenjualan';
import theme from 'themes/theme';
import IconUsang from 'public/images/icons/IconUsang';
import IconTanamBaru from 'public/images/icons/IconTanamBaru';

const TheBottomNavigation = (props) => {
  const { role } = props;
  const navigate = useNavigate();
  const location = useLocation();

  function getPageIndex(route) {
    switch (role) {
      case 'petani':
        switch (route) {
          case '/petani/beranda':
            return 0;
          case '/petani/lahan':
            return 1;
          case '/petani/transaksi':
            return 2;
          case '/petani/riwayat':
            return 3;
          default:
            return 0;
        }
      case 'pedagang':
        switch (route) {
          case '/pedagang/beranda':
            return 0;
          case '/pedagang/transaksi':
            return 1;
          case '/pedagang/usang':
            return 2;
          case '/pedagang/riwayat':
            return 3;
          default:
            return 0;
        }
      default:
        '';
    }
  }

  const value = getPageIndex(location.pathname);

  const actionsPetani = [
    { label: 'Beranda', icon: <HomeRounded />, link: () => navigate('/petani/beranda') },
    { label: 'Lahan', icon: <IconTanamBaru />, link: () => navigate('/petani/lahan') },
    {
      label: 'Transaksi',
      icon: <IconPenjualan />,
      link: () => navigate('/petani/transaksi')
    },
    { label: 'Riwayat', icon: <RestoreIcon />, link: () => navigate('/petani/riwayat') }
  ];

  const actionsPedagang = [
    {
      label: 'Beranda',
      icon: <HomeRounded />,
      link: () => navigate('/pedagang/beranda')
    },
    {
      label: 'Transaksi',
      icon: <IconPenjualan />,
      link: () => navigate('/pedagang/transaksi')
    },
    {
      label: 'Usang',
      icon: <IconUsang />,
      link: () => navigate('/pedagang/usang')
    },
    {
      label: 'Riwayat',
      icon: <RestoreIcon />,
      link: () => navigate('/pedagang/riwayat')
    }
  ];

  let actions = [];
  if (role === 'petani') {
    actions = [];
    actions.push(...actionsPetani);
  } else if (role === 'pedagang') {
    actions = [];
    actions.push(...actionsPedagang);
  }

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
        backgroundColor: theme.palette.dark.main,
        maxWidth: '444px',
        mx: 'auto'
      }}>
      <BottomNavigation sx={{ backgroundColor: 'inherit' }} showLabels value={value}>
        {actions.map((action, index) => (
          <BottomNavigationAction
            key={index}
            label={
              <Typography noWrap variant="body1">
                {action.label}
              </Typography>
            }
            icon={action.icon}
            onClick={action.link}
            sx={{
              color: 'white',
              opacity: 0.7,
              minWidth: 0,
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
