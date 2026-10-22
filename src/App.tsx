import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DynamicMenu } from './components/DynamicMenu';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { TableReservationModal } from './components/TableReservationModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { QRCodeModal } from './components/QRCodeModal';
import { BirthdayPartyCalculator } from './components/BirthdayPartyCalculator';
import { StoryAndAmbience } from './components/StoryAndAmbience';
import { CustomerReviews } from './components/CustomerReviews';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { WelcomeToast } from './components/WelcomeToast';
import { FadeInSection } from './components/FadeInSection';
import { PageIntroSplash } from './components/PageIntroSplash';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HalloweenDecor } from './components/HalloweenDecor';
import { HalloweenSpecialSection } from './components/HalloweenSpecialSection';

import { MENU_ITEMS } from './data/menuData';
import { MenuItem, CartItem, Reservation } from './types/restaurant';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('yhape_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('yhape_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yhape_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync reservations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yhape_reservations', JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  // Cart total items count
  const cartItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Handlers for cart
  const handleAddToCart = (
    dish: MenuItem,
    quantity: number,
    selectedBase?: string,
    selectedSweetener?: string,
    selectedExtras: { name: string; price: number }[] = [],
    specialNotes?: string
  ) => {
    const extrasTotal = selectedExtras.reduce((acc, e) => acc + e.price, 0);
    const unitPrice = dish.price + extrasTotal;

    const newItemId = `${dish.id}-${selectedBase || 'def'}-${selectedSweetener || 'def'}-${selectedExtras.map(e => e.name).join('-')}-${specialNotes || ''}`;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === newItemId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: newItemId,
          menuItem: dish,
          quantity,
          selectedBase,
          selectedSweetener,
          selectedExtras,
          specialNotes,
          unitPrice,
        },
      ];
    });
  };

  const handleQuickAdd = (dish: MenuItem) => {
    handleAddToCart(dish, 1, undefined, undefined, [], undefined);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handlers for reservations
  const handleReservationCreated = (newRes: Reservation) => {
    setReservations(prev => [newRes, ...prev]);
  };

  const handleCancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'cancelada' as const } : r))
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-amber-200 selection:text-stone-900 pb-20 md:pb-0 overflow-x-hidden">
      
      {/* Initial Page Start Logo Splash Reveal */}
      <PageIntroSplash />

      {/* Floating Ambient Halloween Thematic Accents */}
      <HalloweenDecor />

      {/* Top Header */}
      <Header
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenQRCode={() => setIsQRCodeOpen(true)}
        />

        {/* Especial Fiestas de Halloween 2026 */}
        <FadeInSection direction="up">
          <HalloweenSpecialSection
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        </FadeInSection>

        {/* Dynamic Interactive Menu & Brazilian Tapas - Direct and immediately visible */}
        <DynamicMenu
          items={MENU_ITEMS}
          onSelectDish={(dish) => setSelectedDishForModal(dish)}
          onQuickAdd={handleQuickAdd}
          onOpenQRCode={() => setIsQRCodeOpen(true)}
        />

        {/* Birthday & Celebration Pack Builder */}
        <FadeInSection direction="up">
          <BirthdayPartyCalculator />
        </FadeInSection>

        {/* Story & Culinary Philosophy */}
        <FadeInSection direction="up">
          <StoryAndAmbience />
        </FadeInSection>

        {/* Google Maps Customer Reviews Section */}
        <FadeInSection direction="up">
          <CustomerReviews />
        </FadeInSection>

        {/* Location & Opening Hours */}
        <FadeInSection direction="up">
          <LocationAndHours
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        </FadeInSection>
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      
      {/* Dish Customization & Nutrition Modal */}
      <DishDetailModal
        dish={selectedDishForModal}
        onClose={() => setSelectedDishForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal Wizard */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onReservationCreated={handleReservationCreated}
      />

      {/* User Reservations History Modal */}
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onOpenNewReservation={() => {
          setIsMyReservationsOpen(false);
          setIsReservationOpen(true);
        }}
      />

      {/* QR Code & Share Modal */}
      <QRCodeModal
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
      />

      {/* Persistent Floating WhatsApp Access Widget (desktop) */}
      <FloatingWhatsAppWidget
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenQRCode={() => setIsQRCodeOpen(true)}
      />

      {/* 3-Second Welcome Notification Toast */}
      <WelcomeToast />

    </div>
  );
}
