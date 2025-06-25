import { services } from "@/data/services";
import BookingClient from "./_components/BookingClient";

export default function BookingPage() {
  return <BookingClient services={services} />;
}
