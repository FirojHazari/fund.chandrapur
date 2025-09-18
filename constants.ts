
import { User, Role, Village, Contribution, PaymentType, Mentor, Locality } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, username: 'core1', role: Role.CORE },
  { id: 2, username: 'core2', role: Role.CORE },
  { id: 3, username: 'manager_chandrapur', role: Role.MANAGER, assignedVillage: Village.CHANDRAPUR },
  { id: 4, username: 'manager_mohisguha', role: Role.MANAGER, assignedVillage: Village.MOHISGUHA },
  { id: 5, username: 'manager_chatra', role: Role.MANAGER, assignedVillage: Village.CHATRA },
  { id: 6, username: 'Firoj', role: Role.ADMIN },
];

export const MOCK_VILLAGES: Village[] = [
    Village.CHANDRAPUR,
    Village.MOHISGUHA,
    Village.CHATRA,
];

export let MOCK_LOCALITIES: Locality[] = [
    { id: 1, name: 'North', village: Village.CHANDRAPUR },
    { id: 2, name: 'South', village: Village.CHANDRAPUR },
    { id: 3, name: 'Main Market', village: Village.MOHISGUHA },
    { id: 4, name: 'Riverside', village: Village.CHATRA },
];

export let MOCK_MENTORS: Mentor[] = [
    { id: 1, name: 'Rajesh Kumar', contact: '9876543210', village: Village.CHANDRAPUR, locality: 'North' },
    { id: 2, name: 'Sunita Devi', contact: '9876543211', village: Village.MOHISGUHA, locality: 'Main Market' },
];

// Function to generate random date in the last 90 days
const getRandomDate = (): string => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 90);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

export let MOCK_CONTRIBUTIONS: Contribution[] = [
    { id: 1, donorName: 'Amit Singh', village: Village.CHANDRAPUR, locality: 'North', amount: 500, paymentType: PaymentType.CASH, date: getRandomDate() },
    { id: 2, donorName: 'Priya Sharma', village: Village.CHANDRAPUR, locality: 'South', amount: 1000, paymentType: PaymentType.ONLINE, date: getRandomDate() },
    { id: 3, donorName: 'Rohan Mehta', village: Village.MOHISGUHA, locality: 'Main Market', amount: 750, paymentType: PaymentType.CASH, date: getRandomDate() },
    { id: 4, donorName: 'Anjali Gupta', village: Village.CHATRA, locality: 'Riverside', amount: 1200, paymentType: PaymentType.ONLINE, date: getRandomDate() },
    { id: 5, donorName: 'Vikram Rathore', village: Village.CHANDRAPUR, locality: 'North', amount: 250, paymentType: PaymentType.OTHER, date: getRandomDate() },
    { id: 6, donorName: 'Neha Verma', village: Village.MOHISGUHA, locality: 'Main Market', amount: 2000, paymentType: PaymentType.ONLINE, date: getRandomDate() },
    { id: 7, donorName: 'Sanjay Patel', village: Village.CHATRA, locality: 'Riverside', amount: 300, paymentType: PaymentType.CASH, date: getRandomDate() },
    { id: 8, donorName: 'Kavita Joshi', village: Village.CHANDRAPUR, locality: 'South', amount: 1500, paymentType: PaymentType.ONLINE, date: getRandomDate() },
];