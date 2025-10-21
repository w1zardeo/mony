import { useSelector } from 'react-redux';
import { convertToUAH } from '../features/functions'; 

export function useTotalBalance() {
  const bills = useSelector((state) => state.bills.list || []);

  const totalBalance = bills.reduce((sum, bill) => {
    const convertedAmount = convertToUAH(bill.balance, bill.currencyCode);
    return sum + convertedAmount;
  }, 0);

  return totalBalance;
}