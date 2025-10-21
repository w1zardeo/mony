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

export const ALL_ICONS_LIST = iconCategories.flatMap(category => category.icons);