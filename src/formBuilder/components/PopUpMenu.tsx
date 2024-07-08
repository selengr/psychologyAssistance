import { MouseEvent, ReactNode, useState } from 'react';
import Menu from '@mui/material/Menu';
import { LoadingButton } from '@mui/lab';
import { callApiDeleteQuestion, callApiDuplicateQuestion } from '@/services/apis/builder';
import useDesigner from './hooks/useDesigner';
import { IconButton } from '@mui/material';

export default function QuestionMenu({
  children,
  questionID,
  position,
}: {
  children: ReactNode;
  questionID: number;
  position: number;
}) {
  const { removeElement, addElement } = useDesigner();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [loadingDeleteData, setLoadingDeleteData] = useState(false);
  const [loadingDuplicateData, setLoadingDuplicateData] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </IconButton>
      <Menu
        sx={{
          '& .MuiPaper-root': {
            touchAction: 'none',
            width: '125px',
          },
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <LoadingButton
          sx={{
            color: '#FE3232',
          }}
          onClick={async (e) => {
            e.stopPropagation();
            try {
              setLoadingDeleteData(true);
              const res = await callApiDeleteQuestion(questionID);
              if (res?.data?.response) {
                removeElement(questionID);
                setAnchorEl(null);
              }
              setLoadingDeleteData(false);
            } catch (error) {
              setAnchorEl(null);
              setLoadingDeleteData(false);
            }
          }}
          fullWidth
          disabled={loadingDuplicateData}
          loading={loadingDeleteData}
        >
          حذف
        </LoadingButton>
        <LoadingButton
          sx={{
            color: '#12BEFF',
          }}
          onClick={async (e) => {
            e.stopPropagation();
            try {
              setLoadingDuplicateData(true);
              const res = await callApiDuplicateQuestion(questionID);
              const newQuestion = res?.data;
              addElement(position, newQuestion);
              setAnchorEl(null);
              setLoadingDuplicateData(false);
            } catch (error) {
              setAnchorEl(null);
              setLoadingDuplicateData(false);
            }
          }}
          fullWidth
          disabled={loadingDeleteData}
          loading={loadingDuplicateData}
        >
          تکثیر
        </LoadingButton>
      </Menu>
    </>
  );
}
