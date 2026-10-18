export type DietaryTag = 
  | 'vegano' 
  | 'vegetariano' 
  | 'sin-gluten' 
  | 'proteico' 
  | 'keto' 
  | 'artesanal';

export type MenuCategory = 
  | 'todos' 
  | 'tapas'
  | 'salados'
  | 'pasteles'
  | 'burgers'
  | 'bowls' 
  | 'tartas-dulces' 
  | 'bebidas';

export interface AllergenInfo {
  id: string;
  name: string;
  iconName: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'todos'>;
  tagline: string;
  description: string;
  price: number;
  image: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  tags: DietaryTag[];
  allergens: string[];
  isPopular?: boolean;
  portionSize: string;
  customizationOptions?: {
    bases?: string[];
    extraToppings?: { name: string; price: number }[];
    sweetener?: string[];
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedBase?: string;
  selectedSweetener?: string;
  selectedExtras: { name: string; price: number }[];
  specialNotes?: string;
  unitPrice: number;
}

export type DiningZone = 'terraza' | 'salon' | 'fiesta';

export interface Reservation {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  zone: DiningZone;
  occasion: string;
  specialRequests?: string;
  status: 'confirmada' | 'cancelada';
  createdAt: string;
}

export interface PartyCustomOrder {
  guests: number;
  cakeType: string;
  cakeMessage: string;
  salgadosQuantity: number;
  brigadeirosQuantity: number;
  eventDate: string;
  clientName: string;
  clientPhone: string;
  notes?: string;
}
