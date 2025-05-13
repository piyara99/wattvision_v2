'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const router = useRouter();

  const toggleDrawer = () => setOpen(!open);

  const handleNavigation = (path: string) => {
    toggleDrawer();
    router.push(path);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'History', path: '/history' },
    { text: 'Sensors', path: '/sensors' }, 
    { text: 'Settings', path: '/settings' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map(({ text, path }) => (
          <ListItem button key={text} onClick={() => handleNavigation(path)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
