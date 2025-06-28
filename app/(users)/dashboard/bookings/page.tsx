import { RouteGuard } from "@/components/auth/route-guard";
import BookingsClient from "@/components/booking-components/BookingsClient";

export default function UserBookingsPage() {
  return (
    <RouteGuard requireAuth requireRole="USER">
      <BookingsClient />
    </RouteGuard>
  );
}
