import { createContext, useContext } from 'react';

const OrderOrUnOrderContext = createContext<'order' | 'unOrder'>(undefined!);

function OrderOrUnOrderProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: 'order' | 'unOrder';
}) {
  return (
    <OrderOrUnOrderContext.Provider value={value}>
      {children}
    </OrderOrUnOrderContext.Provider>
  );
}

function useOrderOrUnOrder() {
  const context = useContext(OrderOrUnOrderContext);
  if (context === undefined) {
    throw Error(
      `useOrderOrUnOrder must be used within a OrderOrUnOrderProvider`
    );
  }
  return context;
}

export { OrderOrUnOrderProvider, useOrderOrUnOrder };
