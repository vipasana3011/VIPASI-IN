'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  joinedDate: string;
}

export interface SavedAddress {
  id: string;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'Home' | 'Work';
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: 'In Atelier' | 'Handcrafting' | 'Dispatched from Jaipur' | 'Delivered';
  items: {
    productId: string;
    productName: string;
    productImage: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: string;
  trackingNumber?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  orders: CustomerOrder[];
  addresses: SavedAddress[];
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (credentials: { emailOrMobile: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { fullName: string; email: string; mobile: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial demo orders using actual VIPASI outfits
const INITIAL_DEMO_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-01',
    orderNumber: 'VP-2026-8941',
    orderDate: '24 Sep 2026',
    status: 'Dispatched from Jaipur',
    trackingNumber: 'DELHIVERY-JP-994182',
    shippingAddress: 'B-402, Royal Palms, Malviya Nagar, Jaipur, Rajasthan 302017',
    totalAmount: 7890,
    items: [
      {
        productId: 'sitara-ivory-georgette-sharara-set',
        productName: 'Sitara Ivory Georgette Sharara Set',
        productImage: '/images/products/1uY6GVfDtXanel3cZNDzsy74AXZyq5YeP.jpg',
        size: 'M',
        quantity: 1,
        price: 7890,
      },
    ],
  },
];

const INITIAL_DEMO_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-01',
    name: 'Jaipur Atelier Resident',
    mobile: '+91 97994 44663',
    addressLine1: '6/7, Sector 7 Rd, Ramji Pura',
    addressLine2: 'Near World Trade Park, Malviya Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
    isDefault: true,
    type: 'Home',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_DEMO_ORDERS);
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_DEMO_ADDRESSES);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Load persisted user & data
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('vipasi_customer_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedOrders = localStorage.getItem('vipasi_customer_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedAddresses = localStorage.getItem('vipasi_customer_addresses');
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async ({ emailOrMobile, password }: { emailOrMobile: string; password: string }) => {
    if (!emailOrMobile || !password) {
      return { success: false, error: 'Please enter both email/mobile and your password.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Lookup existing or synthesize session profile
    const registeredUsersStr = localStorage.getItem('vipasi_registered_accounts');
    const registeredUsers: any[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
    const found = registeredUsers.find(
      (u) =>
        (u.email.toLowerCase() === emailOrMobile.toLowerCase() || u.mobile === emailOrMobile) &&
        u.password === password
    );

    const loggedUser: UserProfile = found
      ? {
          id: found.id,
          fullName: found.fullName,
          email: found.email,
          mobile: found.mobile,
          joinedDate: found.joinedDate || 'September 2026',
        }
      : {
          id: `usr-${Date.now()}`,
          fullName: emailOrMobile.includes('@') ? emailOrMobile.split('@')[0] : 'VIPASI Patron',
          email: emailOrMobile.includes('@') ? emailOrMobile : `${emailOrMobile}@vipasi.in`,
          mobile: emailOrMobile.includes('@') ? '+91 97994 44663' : emailOrMobile,
          joinedDate: 'September 2026',
        };

    setUser(loggedUser);
    localStorage.setItem('vipasi_customer_user', JSON.stringify(loggedUser));
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async ({
    fullName,
    email,
    mobile,
    password,
  }: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
  }) => {
    if (!fullName || !email || !mobile || !password) {
      return { success: false, error: 'All fields are mandatory to create your account.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      mobile,
      joinedDate: 'September 2026',
    };

    // Save to registered accounts list in localStorage
    try {
      const existingStr = localStorage.getItem('vipasi_registered_accounts');
      const accounts = existingStr ? JSON.parse(existingStr) : [];
      accounts.push({ ...newUser, password });
      localStorage.setItem('vipasi_registered_accounts', JSON.stringify(accounts));
    } catch {
      // Ignore
    }

    setUser(newUser);
    localStorage.setItem('vipasi_customer_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vipasi_customer_user');
  };

  const saveAddress = (address: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = { ...address, id: `addr-${Date.now()}` };
    const updated = [newAddr, ...addresses];
    setAddresses(updated);
    localStorage.setItem('vipasi_customer_addresses', JSON.stringify(updated));
  };

  const deleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('vipasi_customer_addresses', JSON.stringify(updated));
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('vipasi_customer_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        orders,
        addresses,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        saveAddress,
        deleteAddress,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
