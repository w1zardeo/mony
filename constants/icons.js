export const iconCategories = [
  {
    title: "Загальні",
    icons: [
      "alert-circle-outline", "information-circle-outline", "help-circle-outline", "help-circle",
      "calendar-outline", "hammer-outline", "attach-outline", "bonfire-outline", 
      "sparkles-outline", "planet-outline", "ellipsis-horizontal-circle-outline",
    ],
  },
  {
    title: "Їжа та напої",
    icons: [
      "fast-food-outline", "restaurant-outline", "pizza-outline",
      "fast-food", "ice-cream-outline", "nutrition-outline", "server-outline",
      "fish-outline", "egg-outline", "flame-outline",
      "beer-outline", "wine-outline", "cafe-outline",
      "water-outline", "nutrition" 
    ],
  },
  {
    title: "Будівлі",
    icons: [
      "business-outline", "school-outline", "medkit-outline", "storefront-outline",
      "home-outline", "home", "business", "storefront", 
      "home-sharp", "library-outline", "briefcase-outline", "bed-outline",
    ],
  },
  {
    title: "Для дому",
    icons: [
      "wallet-outline", "cart-outline", "cash-outline", "basket-outline",
      "pricetag-outline", "gift-outline", "laptop-outline", "phone-portrait-outline",
      "tv-outline", "game-controller-outline", "watch-outline", "car-sport-outline",
      "airplane-outline", "bus-outline", "bicycle-outline", "barbell-outline",
    ],
  },
];

export const COLOR_LIST = [
  '#FF5733', '#FF8D33', '#FFC300', '#DAF7A6', '#33FF57',
  '#33FFBD', '#33D4FF', '#3371FF', '#8D33FF', '#C70039',
  '#581845', '#1c261b', '#0F2A3B', '#262A2C', '#3A3A3C',
  '#008080', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548',
  '#9E9E9E', '#607D8B', '#E91E63', '#9C27B0', '#673AB7',
];

export const getRandomColor = () => {
  return COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)];
};

export const ALL_ICONS_LIST = iconCategories.flatMap(category => category.icons);