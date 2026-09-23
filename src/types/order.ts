export type DeliveryStatus =
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'untracked';

export type ScenarioId =
  | 'normal'
  | 'delayed'
  | 'delivered_not_received'
  | 'untracked'
  | 'loading'
  | 'error'
  | 'empty';

export type TimelineStepKey = 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

export type StepState = 'completed' | 'current' | 'upcoming' | 'delayed';

export interface TimelineStep {
  key: TimelineStepKey;
  label: string;
  sublabel?: string;
  timestamp?: string;
  status: StepState;
  description?: string;
}

export interface CarrierEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  deliveryNotes?: string;
}

export interface CarrierInfo {
  name: string;
  service: string;
  trackingNumber: string;
  trackingUrl?: string;
  driverName?: string;
  driverVehicle?: string;
}

export interface ProofOfDelivery {
  timestamp: string;
  locationNote: string;
  photoUrl?: string;
  signedBy?: string;
}

export interface PricingSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentLast4: string;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: DeliveryStatus;
  statusDescription: string;
  eta: {
    displayDate: string;
    timeWindow: string;
    relativeCountdown: string;
    progressPercentage: number;
    originalDate?: string;
    isDelayed?: boolean;
    delayReason?: string;
    delayDays?: number;
  };
  timeline: TimelineStep[];
  carrierEvents: CarrierEvent[];
  carrier: CarrierInfo;
  items: OrderItem[];
  address: ShippingAddress;
  pricing: PricingSummary;
  proofOfDelivery?: ProofOfDelivery;
  untrackedInfo?: {
    stageMessage: string;
    estimatedTrackingDate: string;
    warehouseCity: string;
    preparationProgress: number;
  };
}
