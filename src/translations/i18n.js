import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const translations = {
  en: {
    home: 'Home',
    cart: 'Cart',
    step: 'Step',
    of: 'of',
    back: 'Back',
    next: 'Next',
    regularPrice: 'Regular price',
    priceWithExtra: 'Price with extra ingredients',
    fullPrice: 'Full price',
    step11Title: 'Make your own poke bowl',
    step11Description: `Select the type of bowl your’d like, the size, add the base, sauce and all the added ingredients. We’ll take care of the rest!`,
    step21Title: 'Pick a size',
    step22Title: 'Pick a base',
    step23Title: 'Pick a sauce',
    step24Title: 'Pick other ingredients',
    step24Description: 'Pick up to 5, 8 of 10 ingredients based on bowl size.',
    step31Title: 'Pick an extra engredient',
    step31Description: 'Weather its more sashimi or an ingrediant you’d like to try out, feel free to add whatever you’d like.',
    addToCart: 'Add to Cart',
    updateOrder: 'Update Order',
    goToCheckout: 'Go to checkout',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery fee',
    total: 'Total',
    orderMore: 'Order More',
    proceedToCheckout: 'Proceed to Checkout',
  },
  sr: {
    home: 'Pocetna',
    cart: 'Korpa',
    step: 'Korak',
    of: 'od',
    back: 'Nazad',
    next: 'Sledeci Korak',
    regularPrice: 'Regularna cena',
    priceWithExtra: 'Cena sa dodatnim prilozima',
    fullPrice: 'Puna cena',
    step11Title: 'Napravi svoju poke ciniju',
    step11Description: 'Izaberite vrstu činije koju želite, veličinu, dodajte osnovu, sos i sve dodatne sastojke. Mi ćemo se pobrinuti za ostalo!',
    step21Title: 'Izaberi velicinu',
    step22Title: 'Izaberi bazu',
    step23Title: 'Izaberi sos',
    step24Title: 'Izaberi ostale sastojke',
    step24Description: 'Izaberite do 5, 8 ili 10 sastojaka u zavisnosti od veličine činije.',
    step31Title: 'Izaberi dodatke priloge',
    step31Description: 'Bilo da želite više sašimija ili neki sastojak koji biste želeli da probate, slobodno dodajte šta god želite.',
    addToCart: 'Dodaj u Korpu',
    updateOrder: 'Izmeni Porudzbinu',
    goToCheckout: 'Idi na placanje',
    subtotal: 'Međuzbir',
    deliveryFee: 'Trošak dostave',
    total: 'Ukupno',
    orderMore: 'Naruci jos',
    proceedToCheckout: 'Nastavi na placanje',
  },
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export { i18n };
