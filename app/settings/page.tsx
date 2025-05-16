'use client';

import React from 'react';
import SettingsPage from '@/components/SettingsPage';
import DashboardLayout from '@/components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <SettingsPage />
    </DashboardLayout>
  );
}
