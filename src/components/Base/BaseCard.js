import { ChevronRightRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from 'themes/theme';
import { FacebookCircularProgress } from './BaseLoadingRedux';

const BaseCard = (props) => {
  const { title, link, status = 0, loading = false, children, ...rest } = props;

  const navigate = useNavigate();

  // Notes: bgcolor bisa pake enum

  return (
    <Box>
      {title && (
        <Box
          px={2}
          py={0.5}
          bgcolor={
            status === 0
              ? theme.palette.secondary.main
              : status === 1
              ? theme.palette.red.main
              : status === 2
              ? theme.palette.primary.main
              : theme.palette.secondary.main
          }
          borderRadius={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ borderBottomLeftRadius: '0', borderBottomRightRadius: '0' }}>
          <Typography color="white" variant="h5">
            {title}
          </Typography>
          <IconButton size="small" sx={{ color: 'white' }} onClick={() => navigate(link)}>
            <ChevronRightRounded />
          </IconButton>
        </Box>
      )}

      <Box
        px={2}
        py={1.5}
        bgcolor={theme.palette.dark.light}
        borderRadius={2}
        sx={title && { borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
        {...rest}>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <FacebookCircularProgress />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default BaseCard;
