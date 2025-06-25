// Global & Model Types

export type UserRole = "USER" | "EMPLOYEE" | "ADMIN";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export type ServiceType =
  | "HOME_CLEANING"
  | "OFFICE_CLEANING"
  | "MOVE_IN_OUT"
  | "DEEP_CLEANING"
  | "REGULAR_CLEANING";
export type CleaningStatus =
  | "SCHEDULED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type Priority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface Cleaning {
  id: string;
  customerId: string;
  employeeId?: string;
  serviceType: ServiceType;
  status: CleaningStatus;
  date: string;
  address: string;
  note?: string;
  price?: number;
  duration?: number;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  employee?: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  reviews?: Review[];
  payments?: Payment[];
}

export interface Review {
  id: string;
  cleaningId: string;
  customerId: string;
  rating: number;
  comment?: string;
  isPublic: boolean;
  createdAt: string;
  customer: {
    fullName: string;
  };
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentMethod =
  | "CASH"
  | "CARD"
  | "BANK_TRANSFER"
  | "DIGITAL_WALLET";

export interface Payment {
  id: string;
  customerId: string;
  cleaningId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
}

export type EmployeeApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface EmployeeApplication {
  id: string;
  userId: string;
  phone: string;
  address: string;
  experience: string;
  skills: string[];
  availability: string;
  status: EmployeeApplicationStatus;
  createdAt: string;
  reviewedAt?: string;
  notes?: string;
  user: User;
}

export type ChatRoomType = "DIRECT" | "GROUP";
export type ChatMessageType = "TEXT" | "IMAGE" | "FILE";

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  messageType: ChatMessageType;
  isRead: boolean;
  createdAt: string;
}

export interface ChatRoomMember {
  userId: string;
  chatRoomId: string;
  joinedAt: string;
  lastReadAt?: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
}

export interface ChatRoom {
  id: string;
  type: ChatRoomType;
  name?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  members: ChatRoomMember[];
  messages: ChatMessage[];
}

export type NotificationType =
  | "CLEANING_SCHEDULED"
  | "CLEANING_STARTED"
  | "CLEANING_COMPLETED"
  | "MESSAGE_RECEIVED"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_FAILED"
  | "REVIEW_RECEIVED"
  | "SYSTEM_UPDATE";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface Assignment {
  id: string;
  serviceType: string;
  date: string;
  address: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
  customerName: string;
  customerPhone: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
}

export interface Booking {
  id: string;
  serviceType: string;
  date: string;
  address: string;
  status: "SCHEDULED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  price?: number;
  duration?: number;
  employeeName?: string;
  employeePhone?: string;
}

// =================================================================
// Contact Data Types
// =================================================================

export interface Company {
  name: string;
  tagline: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: Address;
}

export interface Social {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface ServiceArea {
  name: string;
  description?: string;
}

export interface ContactData {
  company: Company;
  contact: Contact;
  social: Social;
  businessHours: BusinessHours;
  serviceAreas: ServiceArea[];
}

// =================================================================
// FAQ Data Types
// =================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  image: string;
  rating: number;
  review: string;
}

export interface FAQData {
  faqs: FAQItem[];
}

// =================================================================
// API & Service Types
// =================================================================

export interface ContactSubmissionResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
}

// =================================================================
// Form Validation Types
// =================================================================

export type AdminSignInFormValues = {
  email: string;
  password: string;
};

export type AdminSignUpFormValues = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type EmployeeSignInFormValues = {
  email: string;
  password: string;
};

export type EmployeeSignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  experience: string;
  skills: string;
  availability: string;
};

export type EmployeeApplicationFormValues = {
  phone: string;
  address: string;
  experience: string;
  skills: string;
  availability: string;
};

export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

// =================================================================
// Component Props
// =================================================================

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: User["role"];
  isAuthPage?: boolean;
}

export interface ContactFormProps {
  initialData?: Partial<ContactFormValues>;
}

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "stagger";
  className?: string;
  delay?: number;
}

export interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export interface PageTransitionProps {
  children: React.ReactNode;
}

export interface SmoothScrollProps {
  children: React.ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal";
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

// =================================================================
// Booking Types
// =================================================================

export type ServiceCategory = "OFFICE" | "HOME" | "MOVING_AND_PAINTING";

export interface ServiceOption {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  features: string[];
}

export interface BookingFormValues {
  serviceCategory: ServiceCategory;
  date: string;
  time: string;
  address: string;
  notes?: string;
  frequency?: "ONE_TIME" | "WEEKLY" | "BI_WEEKLY" | "MONTHLY";
  squareFootage?: number;
  rooms?: number;
  bathrooms?: number;
  extras?: string[];
}

export interface BookingStepProps {
  onNext: (data: Partial<BookingFormValues>) => void;
  onBack?: () => void;
  defaultValues?: Partial<BookingFormValues>;
}
