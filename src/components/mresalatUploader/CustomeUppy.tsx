import { styled } from '@mui/material';
import { Dashboard } from '@uppy/react';

const CustomUppy = styled(Dashboard)(({ theme }) => ({
  '*': { boxSizing: 'border-box !important' },
  width: '100%',
  minHeight: '200px',
  '& button.uppy-DashboardContent-back': {
    border: '1px solid #e32437',
    color: '#e32437',
  },
  '& .uppy-Root': {
    width: '100%',
    height: '200px',
    minHeight: '200px !important',
    textAlign: 'right',
    '*': { fontFamily: 'inherit' },
    '& .uppy-Dashboard': {
      width: '100%',
      height: '100%',
      '& .uppy-Dashboard-inner': {
        width: '100% !important',
        height: '100% !important',
        backgroundColor: '#eee',
        '& .uppy-Dashboard-files': {
          padding: 0,
          direction: 'ltr',
          flex: 0.8,
          '& .uppy-Dashboard-Item': {
            float: 'right',
            '@media (max-width:770px)': {
              display: 'flex',
              width: '100%',
            },
          },
          '& .uppy-Dashboard-filesInner': {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            '& .uppy-Dashboard-Item.is-resumable': {
              '& .uppy-Dashboard-Item-fileInfoAndButtons': {
                '& .uppy-Dashboard-Item-fileInfo': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              },
            },
          },
        },
        '& .uppy-DashboardContent-panel': {
          backgroundColor: 'inherit',
          '&#uppy-DashboardContent-panel--Webcam': {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          },
          '&#uppy-DashboardContent-panel--editor': {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '& .uppy-ImageCropper-container': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#eee',
            },
          },
        },
      },
      '& .uppy-Dashboard-AddFiles-title': {
        direction: 'rtl',
        textAlign: 'center',
      },
      '& .uppy-DashboardTab button': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& .uppy-Dashboard-AddFiles-info': {
        display: 'none',
      },
      '& #uppy-DashboardContent-panel--Webcam': {
        backgroundColor: '#eee',
        '& .uppy-DashboardContent-bar': {
          backgroundColor: 'inherit',
        },

        '& .uppy-DashboardContent-panelBody': {
          padding: '2rem',
        },
      },
    },
  },
}));

export default CustomUppy;
