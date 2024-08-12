export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
};

export const deliveryCharge = 100;
export const tax = 0.01

export const calculateTotals = (subTotal:number):string => {
  const addedTax = subTotal * tax;
  return formatCurrency(subTotal + deliveryCharge + addedTax)
}
