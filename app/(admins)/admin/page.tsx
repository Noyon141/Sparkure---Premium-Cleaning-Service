import { RouteGuard } from "@/components/auth/route-guard";
import DynamicAdminDashboard from "./_DynamicDashboard";

export default function AdminDashboardPage() {
  return (
    <RouteGuard requireAuth requireRole="ADMIN">
      <DynamicAdminDashboard />
    </RouteGuard>
  );
}
