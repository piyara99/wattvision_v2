'use client';

import React, { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <Box flexGrow={1} display="flex" flexDirection="column">
        <Header toggleSidebar={toggleSidebar} />
        <Box component="main" p={3} sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: '#f5f5f5' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
