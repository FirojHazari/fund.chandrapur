
export enum Role {
  CORE = 'CORE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum Village {
  CHANDRAPUR = 'Chandrapur',
  MOHISGUHA = 'Mohisguha',
  CHATRA = 'Chatra',
}

export enum PaymentType {
  CASH = 'Cash',
  ONLINE = 'Online',
  OTHER = 'Other',
}

export enum View {
    DASHBOARD = 'Dashboard',
    CONTRIBUTIONS = 'Contributions',
    MENTORS = 'Mentors',
    LOCALITIES = 'Localities',
}

export interface User {
  id: number;
  username: string;
  role: Role;
  assignedVillage?: Village;
}

export interface Locality {
    id: number;
    name: string;
    village: Village;
}

export interface Mentor {
    id: number;
    name: string;
    contact: string;
    village: Village;
    locality: string;
}

export interface Contribution {
    id: number;
    donorName: string;
    donorContact?: string;
    village: Village;
    locality: string;
    amount: number;
    paymentType: PaymentType;
    date: string; // ISO string format
}