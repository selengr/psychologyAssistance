"use client";

import React, { useState } from "react";
import MenuPopover from "@/components/menu-popover/MenuPopover";
import {
  MenuItem
} from '@mui/material';


const Page = () => {

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [openConfirm, setOpenConfirm] = useState(true);

  const handleOpenConfirm = () => {
       setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
       setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
       setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
       setOpenPopover(null);
  };
    return (
        <div>
          
<MenuPopover
                    open={openPopover}
                    onClose={handleClosePopover}
                    arrow="right-bottom"
                    sx={{ width: 200,color:"red !important"}}
               >
                    <MenuItem
                        //  onClick={() => {
                        //       handleOpenConfirm();
                        //       handleClosePopover();
                        //  }}
                         sx={{ color: 'error.main' }}
                    >
                         {/* <Iconify icon="eva:trash-2-outline" /> */}
                         Delete
                    </MenuItem>

                    <MenuItem
                        //  onClick={() => {
                        //       // onEditRow();
                        //       handleClosePopover();
                        //  }}
                    >
                         {/* <Iconify icon="eva:edit-fill" /> */}
                         Edit
                    </MenuItem>
               </MenuPopover>
        </div>
    );
}

export default Page;