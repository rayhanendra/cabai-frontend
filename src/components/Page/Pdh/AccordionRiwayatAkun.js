import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ChevronRightRounded } from '@mui/icons-material';
import { Stack } from '@mui/material';
import BaseButton from 'components/Base/BaseButton';
import { useDispatch } from 'react-redux';
import { relog } from 'redux/slices/auth';
import { useNavigate } from 'react-router-dom';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} {...props} />)(
  ({ theme }) => ({
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.optional.contrastText,
    ':first-of-type': { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' },
    ':last-of-type': { borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }
  })
);

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ChevronRightRounded sx={{ color: 'optional.contrastText' }} />}
    {...props}
  />
))(() => ({
  minHeight: 0,
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255, 255, 255, .125)'
}));

const AccordionRiwayatAkun = (props) => {
  const { item, index = 0 } = props;
  console.log(item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(`panel0`);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleRelog = () => {
    const formData = new URLSearchParams();
    if (item.email) {
      formData.append('account', item.email);
    } else if (item.phone) {
      formData.append('account', item.phone);
    }
    formData.append('password', item.password);

    dispatch(relog(formData));
  };

  return (
    <>
      <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
        <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
          <Typography variant="h6">{item?.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between">
            <BaseButton shape="outlined">
              <Typography
                variant="h5"
                onClick={() => navigate(`/pdh/riwayat-akun/detail/${item?._id}`)}>
                Detail
              </Typography>
            </BaseButton>
            <BaseButton onClick={handleRelog}>
              <Typography variant="h5">Akuisisi Kembali</Typography>
            </BaseButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionRiwayatAkun;
