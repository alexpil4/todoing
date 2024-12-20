'use client';
import { Suspense } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core';
import { AppProvider } from '@toolpad/core/nextjs';
import LinearProgress from '@mui/material/LinearProgress';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Roboto } from 'next/font/google';

import theme from '../theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const NAVIGATION: Navigation = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: '',
      title: 'Task summary',
      icon: <DashboardIcon />,
    },
    {
      segment: 'statistics',
      title: 'Statistics',
      icon: <BarChartIcon />,
    },
  ];

  const BRANDING = {
    title: 'TODOING!',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Suspense fallback={<LinearProgress />}>
            <AppProvider theme={theme} navigation={NAVIGATION} branding={BRANDING}>
              <DashboardLayout>
                <PageContainer>{children}</PageContainer>
              </DashboardLayout>
            </AppProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
