import BookingClient from "@/components/booking-components/BookingClient";
import { services } from "@/data/services";

export default function BookingPage() {
  return <BookingClient services={services} />;
}
