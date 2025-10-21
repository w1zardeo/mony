import { ALL_ICONS_LIST } from "../constants/icons";
import { COLOR_LIST } from "../constants/color";
import {CURRENCIES_DATA} from '../constants/currency';

export function getRandomIcon () {
  return ALL_ICONS_LIST[Math.floor(Math.random() * ALL_ICONS_LIST.length)];
};

export function getRandomColor () {
  return COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
};

export function convertToUAH (amount, currencyCode) {
    const currency = CURRENCIES_DATA.find((item) => item.code === currencyCode);
    if (!currency) return Number(amount) || 0;
    return (Number(amount) || 0) * currency.rateToUAH;
  };
