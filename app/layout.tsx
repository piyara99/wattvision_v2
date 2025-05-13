'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '../styles/globals.css';


// Optional: Google Font (Material 3 default look)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Define a light Material 3 compatible theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
    },
    secondary: {
      main: '#625B71',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="min-h-screen bg-background text-black">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
