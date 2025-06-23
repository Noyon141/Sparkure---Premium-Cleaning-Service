"use client";

import dynamic from "next/dynamic";

const AdminDashboardContent = dynamic(() => import("./_DashboardContent"), {
  ssr: false,
});

export default function DynamicAdminDashboard() {
  return <AdminDashboardContent />;
}
