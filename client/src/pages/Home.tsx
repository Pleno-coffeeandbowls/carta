/**
 * PLENO · Travertino editorial
 * Mobile-first QR menu: calm editorial hierarchy, tactile category rail, real product photography,
 * high-contrast readable pricing, and no decorative UI that competes with food or selection.
 */
import { useEffect, useState } from "react";
import { ArrowUp, ExternalLink, Star, X } from "lucide-react";

type MenuItem = {
  name: string;
  price: string;
  description?: string;
};

type MenuGroup = {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: MenuItem[];
  note?: string;
};

type Language = "es" | "en";

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;
const WELCOME_STORAGE_KEY = "pleno:club-welcome-v1";
const CLUB_PLENO_URL = "https://take.cards/s5msH";

const assets = {
  logo: asset("logo-olive.png"),
  salmonBowl: asset("bowl-salmon.jpeg"),
  coldBowl: asset("bowl-frio-pollo-tacos.webp"),
  beefBowl: asset("bowl-ternera-correcto.webp"),
  bagel: asset("bagel.jpeg"),
  panino: asset("panino.jpeg"),
  eggToast: asset("tosta-huevos.jpeg"),
  brunchToast: asset("brunch-tosta.jpeg"),
  brunchBagel: asset("brunch-bagel.jpeg"),
  acai: asset("acai.jpeg"),
  juices: asset("juices.jpeg"),
  smoothies: asset("smoothies.jpeg"),
  coffee: asset("coffee.jpeg"),
  matcha: asset("matcha.webp"),
};

const navItems = [
  { id: "bagels-paninos", label: "Bagels & Paninos", labelEn: "Bagels & Paninis" },
  { id: "tostas", label: "Tostas y croissants", labelEn: "Toasts & Croissants" },
  { id: "brunch", label: "Brunch" },
  { id: "bowls-frios", label: "Bowls fríos", labelEn: "Cold Bowls" },
  { id: "bowls-calientes", label: "Bowls calientes", labelEn: "Warm Bowls" },
  { id: "acai-protein", label: "Açaí o protein bowl", labelEn: "Açaí or Protein Bowl" },
  { id: "dulces", label: "Dulces", labelEn: "Sweets" },
  { id: "bebidas", label: "Bebidas", labelEn: "Drinks" },
];

const englishTranslations: Record<string, string> = {
  "Bagels & Paninos": "Bagels & Paninis",
  "Platos calientes": "Warm bowls",
  "Ensaladas frescas": "Fresh salads",
  "Crea tu propia ensalada": "Build your own salad",
  "Crea tu bagel o panino": "Build your bagel or panini",
  "Tostas · Pan de masa madre": "Toasts · Sourdough bread",
  "Tostas y croissants": "Toasts & Croissants",
  "Tosta de Aguacate & Huevo Poché": "Avocado & Poached Egg Toast",
  "Brunch con tosta": "Toast Brunch",
  "Brunch con bagel": "Bagel Brunch",
  "BOWL AVOCADO": "AVOCADO BOWL",
  "Café PLENO": "PLENO Coffee",
  "Bowls fríos": "Cold Bowls",
  "Bowls calientes": "Warm Bowls",
  "Dulces": "Sweets",
  "Zumos naturales": "Fresh juices",
  "Café & Matcha": "Coffee & Matcha",
  "Salmón": "Salmon",
  "Pollo miel mostaza": "Honey Mustard Chicken",
  "Pavo & Aguacate": "Turkey & Avocado",
  "Pollo pesto": "Pesto Chicken",
  "Atún Spicy": "Spicy Tuna",
  "Aguacate & Huevo Poché": "Avocado & Poached Egg",
  "Salmón y queso crema": "Salmon & Cream Cheese",
  "Jamón Ibérico & Tomate": "Iberian Ham & Tomato",
  "Tomate y aceite de oliva virgen extra": "Tomato & Extra Virgin Olive Oil",
  "Croissant solo": "Plain Croissant",
  "Croissant de york y queso": "Ham & Cheese Croissant",
  "Croissant de ibérico y tomate": "Iberian Ham & Tomato Croissant",
  "Croissant de atún vegetal": "Plant-Based Tuna Croissant",
  "Croissant de crema de cacao": "Cocoa Cream Croissant",
  "Croissant de mantequilla de maní y mermelada": "Peanut Butter & Jam Croissant",
  "Opción 1": "Option 1",
  "Opción 2": "Option 2",
  "Café solo · Espresso": "Espresso",
  "Café con leche": "Coffee with Milk",
  "Café con leche XL": "Coffee with Milk XL",
  "Café con leche sin lactosa, soja o avena": "Coffee with Lactose-Free, Soy or Oat Milk",
  "Café con leche sin lactosa, soja o avena XL": "Coffee with Lactose-Free, Soy or Oat Milk XL",
  "Té e infusiones": "Tea & Infusions",
  "Matcha Latte Caliente": "Hot Matcha Latte",
  "Matcha Latte Frío": "Iced Matcha Latte",
  "Ube Latte Caliente": "Hot Ube Latte",
  "Ube Latte Frío": "Iced Ube Latte",
  "Tarta de zanahoria · saludable, con harina de almendras": "Carrot cake · made with almond flour",
  "Tarta de banana · saludable, con harina de almendras": "Banana cake · made with almond flour",
  "Rol de canela": "Cinnamon Roll",
  "Mini napolitana": "Mini Pain au Chocolat",
  "Purify · Naranja + Zanahoria": "Purify · Orange + Carrot",
  "Chillout · Naranja + Fresa + Plátano": "Chillout · Orange + Strawberry + Banana",
  "Healthy · Naranja + Zanahoria + Remolacha": "Healthy · Orange + Carrot + Beetroot",
  "Digestive · Naranja + Piña + Plátano": "Digestive · Orange + Pineapple + Banana",
  "Detox · Naranja + Manzana + Espinaca + Pepino + Jengibre + Apio": "Detox · Orange + Apple + Spinach + Cucumber + Ginger + Celery",
  "Kombucha Ginger and Lemon": "Ginger & Lemon Kombucha",
  "Kombucha Wild Berries": "Wild Berries Kombucha",
  "Kombucha Lime and Mint": "Lime & Mint Kombucha",
  "Salmón ahumado, queso crema, cebolla encurtida y rúcula.": "Smoked salmon, cream cheese, pickled onion and rocket.",
  "Pollo al grill, tomate natural, queso edam y miel mostaza.": "Grilled chicken, fresh tomato, Edam cheese and honey mustard.",
  "Pavo, aguacate, tomate y aceite de oliva virgen extra.": "Turkey, avocado, tomato and extra virgin olive oil.",
  "Pollo al grill, tomate, noodles de calabacín y pesto casero.": "Grilled chicken, tomato, courgette noodles and homemade pesto.",
  "Pulled pork, coleslaw y bastones de boniato al horno.": "Pulled pork, coleslaw and oven-baked sweet potato fries.",
  "Atún spicy, aderezo de chipotle, tomate y mix de lechugas y aguacate.": "Spicy tuna, chipotle dressing, tomato, mixed leaves and avocado.",
  "Paso 3: Añade extras: Huevo poché (+3,90 €), aguacate (+3,90 €), hummus casero (+3,50 €), pavo (+3,50 €), salmón (+4,50 €) y queso (+3,50 €).": "Step 3: Add extras: poached egg (+€3.90), avocado (+€3.90), homemade hummus (+€3.50), turkey (+€3.50), salmon (+€4.50) and cheese (+€3.50).",
  "Bagel de pavo y aguacate o panino de pollo. Incluye: Zumo de naranja o zumo mix del día; café o infusión; bizcocho casero o napolitana de chocolate; yogur natural con granola y miel.": "Turkey & avocado bagel or chicken panini. Includes: orange juice or seasonal mixed juice; coffee or infusion; homemade cake or chocolate pain au chocolat; natural yogurt with granola and honey.",
  "Tosta de aguacate con dos huevos poché o tosta de ibérico, tomate y queso semicurado. Incluye: Café o infusión; zumo de naranja o zumo mix del día; bizcocho casero o napolitana de chocolate; yogur natural con granola y miel.": "Avocado toast with two poached eggs or Iberian ham, tomato & semi-cured cheese toast. Includes: coffee or infusion; orange juice or seasonal mixed juice; homemade cake or chocolate pain au chocolat; natural yogurt with granola and honey.",
  "Tortitas healthy o Fitbowl. Incluye: Zumo de naranja o zumo del día; tosta con tomate y aceite de oliva virgen; café o infusión.": "Healthy pancakes or Fitbowl. Includes: orange juice or juice of the day; tomato & extra virgin olive oil toast; coffee or infusion.",
  "¿Prefieres nuestro bagel de salmón o nuestra tosta de salmón y queso crema? Por +3,50 € más puedes elegir este principal en Bagel Brunch y Tosta Brunch.": "Prefer our salmon bagel or salmon & cream cheese toast? For an additional €3.50, choose it as the main dish in Bagel Brunch and Toast Brunch.",
  "Pollo cúrcuma, aguacate, tomatitos cherry, col lombarda, cebolla morada, nachos, espinaca baby, mézclum y pesto de cilantro con lima.": "Turmeric chicken, avocado, cherry tomatoes, red cabbage, red onion, nachos, baby spinach, mixed leaves and coriander-lime pesto.",
  "Lentejas, garbanzos, boniato y brócoli al horno, col lombarda, almendras tostadas, remolacha, espinacas baby, kale y vinagreta cítrica de frutos rojos.": "Lentils, chickpeas, oven-baked sweet potato and broccoli, red cabbage, toasted almonds, beetroot, baby spinach, kale and red berry citrus vinaigrette.",
  "Pollo a la naranja, noodles de calabacín, pipas de calabaza tostadas, tomatitos cherry, cilantro, queso feta, crotones, rúcula, mézclum, aceite de albahaca y salsa de yogurt.": "Orange chicken, courgette noodles, toasted pumpkin seeds, cherry tomatoes, coriander, feta cheese, croutons, rocket, mixed leaves, basil oil and yogurt sauce.",
  "Pollo cúrcuma, calabaza al horno, quinoa, espinacas baby, kale rostizado, zanahoria, col lombarda, almendras tostadas y salsa de miel mostaza.": "Turmeric chicken, oven-baked squash, quinoa, baby spinach, roasted kale, carrot, red cabbage, toasted almonds and honey mustard sauce.",
  "Tofu asado, mix de portobellos, remolacha, pepino, pipas de calabaza, cebolla encurtida, arroz salvaje, kale, sésamo y vinagreta de soja jengibre.": "Roasted tofu, mixed portobello mushrooms, beetroot, cucumber, pumpkin seeds, pickled onion, wild rice, kale, sesame and soy-ginger vinaigrette.",
  "Pollo a la naranja, noodles de calabacín, zanahoria, col lombarda, pepino, arroz salvaje, cebolla crusty, cilantro, almendras y vinagreta de anacardos.": "Orange chicken, courgette noodles, carrot, red cabbage, cucumber, wild rice, crispy onion, coriander, almonds and cashew vinaigrette.",
  "Elige 2 bases, 1 proteína y 2 ingredientes.": "Choose 2 bases, 1 protein and 2 ingredients.",
  "Elige 2 bases, 1 proteína y 3 ingredientes.": "Choose 2 bases, 1 protein and 3 ingredients.",
  "SÚPER WRAP: Convierte toda tu ensalada en un Súper Wrap envuelta en una tortilla y con un toque al grill por +1,90 €. Extras Premium: Aguacate (+3,90 €), Extra Proteína (+3,90 €).": "SUPER WRAP: Turn your whole salad into a Super Wrap in a tortilla, finished on the grill, for +€1.90. Premium extras: avocado (+€3.90), extra protein (+€3.90).",
  "Tofu marinado en soja y miel mostaza, arroz integral con verduritas, boniato al horno, pico de gallo, aguacate y salsa de soja con naranja.": "Tofu marinated in soy and honey mustard, brown rice with vegetables, oven-baked sweet potato, pico de gallo, avocado and orange soy sauce.",
  "Lomo de salmón al grill, arroz integral con verduritas, boniato al horno, pico de gallo, aguacate y salsa cítrica.": "Grilled salmon fillet, brown rice with vegetables, oven-baked sweet potato, pico de gallo, avocado and citrus sauce.",
  "Slow cooked pulled pork, arroz integral, frijoles negros, plátano maduro asado, pico de gallo, aguacate, tortilla crujiente y salsa de miel mostaza.": "Slow-cooked pulled pork, brown rice, black beans, roasted ripe plantain, pico de gallo, avocado, crispy tortilla and honey mustard sauce.",
  "Pechuga de pollo marinada con naranja al grill, quinoa, boniato al horno, pico de gallo, aguacate y salsa pesto de cilantro.": "Orange-marinated grilled chicken breast, quinoa, oven-baked sweet potato, pico de gallo, avocado and coriander pesto sauce.",
  "Entrecot al grill, arroz, brócoli, boniato o patata, champiñones salteados, aguacate y pico de gallo.": "Grilled entrecôte, rice, broccoli, sweet potato or potato, sautéed mushrooms, avocado and pico de gallo.",
  "Añade extra de proteína por +5,50 €.": "Add extra protein for +€5.50.",
  "Base de açaí original.": "Original açaí base.",
  "Base de yogur griego.": "Greek yogurt base.",
  "Añade un extra: proteína, creatina, colágeno o crema de cacahuete.": "Add an extra: protein, creatine, collagen or peanut butter.",
  "Con leche, hielo y sirope.": "With milk, ice and syrup.",
  "Hierbas filipinas con notas a vainilla y frutos secos. Cero cafeína.": "Filipino herbs with vanilla and nutty notes. Caffeine-free.",
};

const interfaceText = {
  es: {
    htmlLang: "es", headerLabel: "Cabecera de carta PLENO", brandLabel: "PLENO, volver al inicio", heroTitle: "Estado en el que descubres que cuidarte también puede disfrutarse.", heroText: "Ocurre cuando la buena comida, el tiempo bien invertido y las personas correctas se encuentran en el mismo lugar.", indexTitle: "Carta", navLabel: "Categorías de la carta", languageLabel: "Seleccionar idioma", carouselPhotos: "Fotos de", carouselView: "Ver", communityLabel: "Comunidad PLENO", reviewEyebrow: "PINALE Brunch & Market Bowls", reviewTitle: "Queremos saber tu opinión.", reviewText: "Publica una reseña en nuestro perfil.", reviewCta: "Dejar reseña", clubEyebrow: "Healthy Social Club", clubText: "Crea tu tarjeta de fidelización y empieza con 10 puntos de bienvenida.", clubCta: "Crear mi tarjeta", topLabel: "Volver al inicio de la carta", closeWelcome: "Cerrar aviso de bienvenida", welcomeTitle: "10 puntos de bienvenida", welcomeText: "Crea tu tarjeta de fidelización de Club Pleno y empieza con 10 puntos.", welcomeCta: "Crear mi tarjeta", welcomeDismiss: "Ahora no",
  },
  en: {
    htmlLang: "en", headerLabel: "PLENO menu header", brandLabel: "PLENO, back to top", heroTitle: "A state where looking after yourself can also be enjoyed.", heroText: "It happens when good food, time well spent and the right people come together in the same place.", indexTitle: "Menu", navLabel: "Menu categories", languageLabel: "Choose language", carouselPhotos: "Photos of", carouselView: "View", communityLabel: "PLENO community", reviewEyebrow: "PINALE Brunch & Market Bowls", reviewTitle: "We would love to hear from you.", reviewText: "Leave us a review on our profile.", reviewCta: "Leave a review", clubEyebrow: "Healthy Social Club", clubText: "Create your loyalty card and start with 10 welcome points.", clubCta: "Create my card", topLabel: "Back to the top of the menu", closeWelcome: "Close welcome notice", welcomeTitle: "10 welcome points", welcomeText: "Create your Club Pleno loyalty card and start with 10 points.", welcomeCta: "Create my card", welcomeDismiss: "Not now",
  },
} as const;

const marketBowls: MenuGroup = {
  eyebrow: "Platos calientes",
  title: "Market Bowls",
  items: [
    {
      name: "Vegan Bowl",
      price: "15,90 €",
      description:
        "Tofu marinado en soja y miel mostaza, arroz integral con verduritas, boniato al horno, pico de gallo, aguacate y salsa de soja con naranja.",
    },
    {
      name: "Salmon Bowl",
      price: "17,90 €",
      description:
        "Lomo de salmón al grill, arroz integral con verduritas, boniato al horno, pico de gallo, aguacate y salsa cítrica.",
    },
    {
      name: "Pulled Pork Bowl",
      price: "16,90 €",
      description:
        "Slow cooked pulled pork, arroz integral, frijoles negros, plátano maduro asado, pico de gallo, aguacate, tortilla crujiente y salsa de miel mostaza.",
    },
    {
      name: "Power Bowl",
      price: "16,90 €",
      description:
        "Pechuga de pollo marinada con naranja al grill, quinoa, boniato al horno, pico de gallo, aguacate y salsa pesto de cilantro.",
    },
    {
      name: "Steak Bowl",
      price: "17,90 €",
      description: "Entrecot al grill, arroz, brócoli, boniato o patata, champiñones salteados, aguacate y pico de gallo.",
    },
  ],
  note: "Añade extra de proteína por +5,50 €.",
};

const saladBowls: MenuGroup = {
  eyebrow: "Ensaladas frescas",
  title: "Salad Bowls",
  items: [
    {
      name: "Avocado",
      price: "15,90 €",
      description:
        "Pollo cúrcuma, aguacate, tomatitos cherry, col lombarda, cebolla morada, nachos, espinaca baby, mézclum y pesto de cilantro con lima.",
    },
    {
      name: "Veggie",
      price: "13,90 €",
      description:
        "Lentejas, garbanzos, boniato y brócoli al horno, col lombarda, almendras tostadas, remolacha, espinacas baby, kale y vinagreta cítrica de frutos rojos.",
    },
    {
      name: "Señor Zucchini",
      price: "14,90 €",
      description:
        "Pollo a la naranja, noodles de calabacín, pipas de calabaza tostadas, tomatitos cherry, cilantro, queso feta, crotones, rúcula, mézclum, aceite de albahaca y salsa de yogurt.",
    },
    {
      name: "Señorita Pumpkin",
      price: "14,90 €",
      description:
        "Pollo cúrcuma, calabaza al horno, quinoa, espinacas baby, kale rostizado, zanahoria, col lombarda, almendras tostadas y salsa de miel mostaza.",
    },
    {
      name: "Tofunghi",
      price: "14,90 €",
      description:
        "Tofu asado, mix de portobellos, remolacha, pepino, pipas de calabaza, cebolla encurtida, arroz salvaje, kale, sésamo y vinagreta de soja jengibre.",
    },
    {
      name: "Crusty",
      price: "13,90 €",
      description:
        "Pollo a la naranja, noodles de calabacín, zanahoria, col lombarda, pepino, arroz salvaje, cebolla crusty, cilantro, almendras y vinagreta de anacardos.",
    },
  ],
};

const customSalad: MenuGroup = {
  title: "Crea tu propia ensalada",
  items: [
    { name: "Opción 1", price: "12,90 €", description: "Elige 2 bases, 1 proteína y 2 ingredientes." },
    { name: "Opción 2", price: "13,90 €", description: "Elige 2 bases, 1 proteína y 3 ingredientes." },
  ],
  note:
    "SÚPER WRAP: Convierte toda tu ensalada en un Súper Wrap envuelta en una tortilla y con un toque al grill por +1,90 €. Extras Premium: Aguacate (+3,90 €), Extra Proteína (+3,90 €).",
};

const bagels: MenuGroup = {
  eyebrow: "Crea tu bagel o panino",
  title: "Bagels & Paninos",
  items: [
    { name: "Salmón", price: "11,50 €", description: "Salmón ahumado, queso crema, cebolla encurtida y rúcula." },
    { name: "Pollo miel mostaza", price: "9,50 €", description: "Pollo al grill, tomate natural, queso edam y miel mostaza." },
    { name: "Pavo & Aguacate", price: "9,90 €", description: "Pavo, aguacate, tomate y aceite de oliva virgen extra." },
    { name: "Pollo pesto", price: "9,50 €", description: "Pollo al grill, tomate, noodles de calabacín y pesto casero." },
    { name: "Pulled Pork", price: "10,90 €", description: "Pulled pork, coleslaw y bastones de boniato al horno." },
    { name: "Atún Spicy", price: "12,50 €", description: "Atún spicy, aderezo de chipotle, tomate y mix de lechugas y aguacate." },
  ],
  note:
    "Paso 3: Añade extras: Huevo poché (+3,90 €), aguacate (+3,90 €), hummus casero (+3,50 €), pavo (+3,50 €), salmón (+4,50 €) y queso (+3,50 €).",
};

const tostas: MenuGroup = {
  title: "Tostas · Pan de masa madre",
  items: [
    { name: "Aguacate & Huevo Poché", price: "8,90 €" },
    { name: "Salmón y queso crema", price: "9,90 €" },
    { name: "Jamón Ibérico & Tomate", price: "8,90 €" },
    { name: "Pavo & Aguacate", price: "8,90 €" },
    { name: "Tomate y aceite de oliva virgen extra", price: "4,50 €" },
  ],
};

const brunch: MenuGroup = {
  title: "Brunch",
  items: [
    {
      name: "Bagel Brunch",
      price: "23,00 €",
      description:
        "Bagel de pavo y aguacate o panino de pollo. Incluye: Zumo de naranja o zumo mix del día; café o infusión; bizcocho casero o napolitana de chocolate; yogur natural con granola y miel.",
    },
    {
      name: "Tosta Brunch",
      price: "21,00 €",
      description:
        "Tosta de aguacate con dos huevos poché o tosta de ibérico, tomate y queso semicurado. Incluye: Café o infusión; zumo de naranja o zumo mix del día; bizcocho casero o napolitana de chocolate; yogur natural con granola y miel.",
    },
    {
      name: "Sweet & Healthy Brunch",
      price: "20,00 €",
      description:
        "Tortitas healthy o Fitbowl. Incluye: Zumo de naranja o zumo del día; tosta con tomate y aceite de oliva virgen; café o infusión.",
    },
  ],
  note:
    "¿Prefieres nuestro bagel de salmón o nuestra tosta de salmón y queso crema? Por +3,50 € más puedes elegir este principal en Bagel Brunch y Tosta Brunch.",
};

const acai: MenuGroup = {
  title: "Açaí & Fitbowl",
  items: [
    { name: "Açaí Bowl", price: "10,90 €", description: "Base de açaí original." },
    { name: "Fitbowl", price: "9,90 €", description: "Base de yogur griego." },
  ],
};

const croissants: MenuGroup = {
  title: "Croissants",
  items: [
    { name: "Croissant solo", price: "3,50 €" },
    { name: "Croissant de york y queso", price: "5,50 €" },
    { name: "Croissant de ibérico y tomate", price: "6,00 €" },
    { name: "Croissant de atún vegetal", price: "5,90 €" },
    { name: "Croissant de crema de cacao", price: "4,50 €" },
    { name: "Croissant de mantequilla de maní y mermelada", price: "4,50 €" },
  ],
};

const sweet: MenuGroup = {
  title: "Dulces",
  items: [
    { name: "Tarta de zanahoria · saludable, con harina de almendras", price: "4,50 €" },
    { name: "Tarta de banana · saludable, con harina de almendras", price: "4,50 €" },
    { name: "Rol de canela", price: "4,20 €" },
    { name: "Mini napolitana", price: "2,30 €" },
  ],
};

const juices: MenuGroup = {
  title: "Zumos naturales",
  items: [
    { name: "Purify · Naranja + Zanahoria", price: "7,90 €" },
    { name: "Chillout · Naranja + Fresa + Plátano", price: "7,90 €" },
    { name: "Healthy · Naranja + Zanahoria + Remolacha", price: "7,90 €" },
    { name: "Digestive · Naranja + Piña + Plátano", price: "7,90 €" },
    { name: "Detox · Naranja + Manzana + Espinaca + Pepino + Jengibre + Apio", price: "7,90 €" },
  ],
};

const smoothies: MenuGroup = {
  title: "Protein Smoothies",
  items: [
    { name: "Green Energy", price: "9,50 €" },
    { name: "Berry Blast", price: "9,50 €" },
    { name: "Tropical Sunshine", price: "9,50 €" },
    { name: "Dark Cacao Protein", price: "9,50 €" },
    { name: "Flow Bomb", price: "9,50 €" },
  ],
  note: "Añade un extra: proteína, creatina, colágeno o crema de cacahuete.",
};

const coffee: MenuGroup = {
  title: "Café & Matcha",
  items: [
    { name: "Café solo · Espresso", price: "2,60 €" },
    { name: "Cortado", price: "2,80 €" },
    { name: "Americano", price: "2,60 €" },
    { name: "Café con leche", price: "3,30 €" },
    { name: "Café con leche XL", price: "3,80 €" },
    { name: "Café con leche sin lactosa, soja o avena", price: "3,50 €" },
    { name: "Café con leche sin lactosa, soja o avena XL", price: "4,00 €" },
    { name: "Cappuccino", price: "3,60 €" },
    { name: "Frappé", price: "4,60 €", description: "Con leche, hielo y sirope." },
    { name: "Carajillo", price: "4,80 €" },
    { name: "Colacao", price: "3,90 €" },
    { name: "Té e infusiones", price: "3,00 €" },
    { name: "Matcha Latte Caliente", price: "4,00 €" },
    { name: "Matcha Latte Frío", price: "4,30 €" },
    { name: "Ube Latte Caliente", price: "4,00 €", description: "Hierbas filipinas con notas a vainilla y frutos secos. Cero cafeína." },
    { name: "Ube Latte Frío", price: "4,30 €", description: "Hierbas filipinas con notas a vainilla y frutos secos. Cero cafeína." },
  ],
};

const kombucha: MenuGroup = {
  title: "Kombucha Miwi",
  items: [
    { name: "Kombucha Ginger and Lemon", price: "3,80 €" },
    { name: "Kombucha Wild Berries", price: "3,80 €" },
    { name: "Kombucha Lime and Mint", price: "3,80 €" },
  ],
};

function MenuList({ group, translate, compact = false, subtleHeading = false }: { group: MenuGroup; translate: (text?: string) => string | undefined; compact?: boolean; subtleHeading?: boolean }) {
  return (
    <div className={`menu-list ${compact ? "menu-list--compact" : ""} ${subtleHeading ? "menu-list--subtle" : ""}`}>
      <div className="section-heading">
        {group.eyebrow && <p className="eyebrow">{translate(group.eyebrow)}</p>}
        <h2>{translate(group.title)}</h2>
        {group.intro && <p className="section-intro">{translate(group.intro)}</p>}
        <div className="section-editorial-rule" aria-hidden="true"><span /></div>
      </div>
      <div className="item-stack">
        {group.items.map((item, index) => (
          <article className="menu-item" key={`${item.name}-${index}`}>
            <div className="item-line">
              <h3>{translate(item.name)}</h3>
              <span className="item-price">{item.price}</span>
            </div>
            {item.description && <p>{translate(item.description)}</p>}
          </article>
        ))}
      </div>
      {group.note && <p className="section-note">{translate(group.note)}</p>}
    </div>
  );
}

function ProductPhoto({ src, label, translate, priority = false, fit = "cover" }: { src: string; label: string; translate: (text?: string) => string | undefined; priority?: boolean; fit?: "cover" | "contain" | "focus" }) {
  return (
    <figure className={`product-photo product-photo--${fit}`}>
      <div className="photo-frame">
        <img src={src} alt={translate(label) ?? label} loading={priority ? "eager" : "lazy"} />
      </div>
      <figcaption>{translate(label)}</figcaption>
    </figure>
  );
}

function PhotoCarousel({ slides, label, translate, carouselPhotos, carouselView }: { slides: Array<{ src: string; label: string }>; label: string; translate: (text?: string) => string | undefined; carouselPhotos: string; carouselView: string }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  return (
    <figure className="product-carousel" aria-label={translate(label)}>
      <div className="carousel-frame">
        <img src={slide.src} alt={translate(slide.label) ?? slide.label} loading="lazy" />
      </div>
      <figcaption>{translate(slide.label)}</figcaption>
      <div className="carousel-nav" role="tablist" aria-label={`${carouselPhotos} ${translate(label)}`}>
        {slides.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={activeSlide === index}
            aria-label={`${carouselView} ${translate(item.label)}`}
            className={activeSlide === index ? "carousel-dot is-active" : "carousel-dot"}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </figure>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [active, setActive] = useState("bagels-paninos");
  const [showTop, setShowTop] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const text = interfaceText[language];
  const translate = (value?: string) => language === "en" && value ? (englishTranslations[value] ?? value) : value;

  useEffect(() => {
    document.documentElement.lang = text.htmlLang;
    document.title = language === "en" ? "PLENO · Digital Menu" : "PLENO · Carta digital";
  }, [language, text.htmlLang]);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-22% 0px -64% 0px", threshold: [0.1, 0.35, 0.65] },
    );

    sections.forEach((section) => observer.observe(section));
    const onScroll = () => setShowTop(window.scrollY > 680);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem(WELCOME_STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setShowWelcome(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showWelcome) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.localStorage.setItem(WELCOME_STORAGE_KEY, "seen");
        setShowWelcome(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showWelcome]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const dismissWelcome = () => {
    window.localStorage.setItem(WELCOME_STORAGE_KEY, "seen");
    setShowWelcome(false);
  };

  return (
    <main>
      <header className="site-header" aria-label={text.headerLabel}>
        <div className="header-inner">
          <a className="brand" href="#inicio" aria-label={text.brandLabel}>
            <img src={assets.logo} alt="PLENO" />
          </a>
          <div className="language-switch" role="group" aria-label={text.languageLabel}>
            <button type="button" className={language === "es" ? "is-active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-pronunciation">/ˈple.no/</p>
          <h1 id="hero-title">{text.heroTitle}</h1>
          <p className="hero-text">{text.heroText}</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hero-food" src={assets.salmonBowl} alt="" fetchPriority="high" />
        </div>
      </section>

      <nav className="category-nav" aria-label={text.navLabel}>
        <div className="category-rail">
          <span className="index-title" aria-hidden="true">{text.indexTitle}</span>
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(item.id)}
              className={active === item.id ? "category-pill is-active" : "category-pill"}
              data-index={`0${index + 1}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {language === "en" ? item.labelEn ?? item.label : item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="menu-shell">
        <section className="menu-section menu-section--panes" id="bagels-paninos" aria-label={language === "en" ? "Bagels and paninis" : "Bagels y paninos"}>
          <div className="section-number" aria-hidden="true">01</div>
          <div className="panes-flow">
            <div className="panes-chapter">
              <div className="section-copy">
                <MenuList group={bagels} translate={translate} />
              </div>
              <PhotoCarousel label="Bagels y paninos" translate={translate} carouselPhotos={text.carouselPhotos} carouselView={text.carouselView} slides={[
                { src: assets.bagel, label: "Bagel" },
                { src: assets.panino, label: "Panino" },
              ]} />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--panes" id="tostas" aria-label={translate("Tostas y croissants")}>
          <div className="section-number" aria-hidden="true">02</div>
          <div className="panes-flow">
            <div className="panes-chapter panes-chapter--reverse">
              <ProductPhoto src={assets.eggToast} label="Tosta de Aguacate & Huevo Poché" translate={translate} />
              <div className="section-copy">
                <div className="section-heading section-heading--chapter">
                  <h2>{translate("Tostas y croissants")}</h2>
                  <div className="section-editorial-rule" aria-hidden="true"><span /></div>
                </div>
                <div className="sweet-groups">
                  <MenuList group={tostas} translate={translate} compact subtleHeading />
                  <div className="subsection-divider" />
                  <MenuList group={croissants} translate={translate} compact subtleHeading />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--panes" id="brunch" aria-label="Brunch">
          <div className="section-number" aria-hidden="true">03</div>
          <div className="panes-flow">
            <div className="panes-chapter">
              <div className="section-copy">
                <MenuList group={brunch} translate={translate} />
              </div>
              <PhotoCarousel label="Brunch PLENO" translate={translate} carouselPhotos={text.carouselPhotos} carouselView={text.carouselView} slides={[
                { src: assets.brunchToast, label: "Brunch con tosta" },
                { src: assets.brunchBagel, label: "Brunch con bagel" },
              ]} />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--salads" id="bowls-frios" aria-label={translate("Bowls fríos")}>
          <div className="section-number" aria-hidden="true">04</div>
          <ProductPhoto src={assets.coldBowl} label="BOWL AVOCADO" translate={translate} />
          <div className="section-copy">
            <MenuList group={saladBowls} translate={translate} />
            <div className="custom-salad-block">
              <MenuList group={customSalad} translate={translate} compact />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--bowls" id="bowls-calientes" aria-label={translate("Bowls calientes")}>
          <div className="section-number" aria-hidden="true">05</div>
          <div className="section-copy">
            <MenuList group={marketBowls} translate={translate} />
          </div>
          <ProductPhoto src={assets.beefBowl} label="Steak Bowl" translate={translate} priority />
        </section>

        <section className="menu-section menu-section--sweet menu-section--protein" id="acai-protein" aria-label={language === "en" ? "Açaí or Protein Bowl" : "Açaí o protein bowl"}>
          <div className="section-number" aria-hidden="true">06</div>
          <div className="section-copy section-copy--paired protein-layout">
            <div className="protein-chapter">
              <MenuList group={acai} translate={translate} />
              <ProductPhoto src={assets.acai} label="Açaí Bowl" translate={translate} />
            </div>
            <div className="protein-chapter">
              <MenuList group={smoothies} translate={translate} />
              <ProductPhoto src={assets.smoothies} label="Protein Smoothies" translate={translate} fit="focus" />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--sweet" id="dulces" aria-label={translate("Dulces")}>
          <div className="section-number" aria-hidden="true">07</div>
          <div className="section-copy">
            <MenuList group={sweet} translate={translate} />
          </div>
        </section>

        <section className="menu-section menu-section--drinks" id="bebidas" aria-label={translate("Bebidas")}>
          <div className="section-number" aria-hidden="true">08</div>
          <div className="section-copy drinks-layout">
            <MenuList group={juices} translate={translate} />
            <div className="drink-photos" aria-label={language === "en" ? "PLENO drinks" : "Bebidas PLENO"}>
              <ProductPhoto src={assets.juices} label="Zumos naturales" translate={translate} fit="focus" />
            </div>
            <div className="subsection-divider" />
            <MenuList group={coffee} translate={translate} compact />
            <MenuList group={kombucha} translate={translate} compact subtleHeading />
          </div>
          <PhotoCarousel label="Café y Matcha" translate={translate} carouselPhotos={text.carouselPhotos} carouselView={text.carouselView} slides={[
            { src: assets.coffee, label: "Café PLENO" },
            { src: assets.matcha, label: "Matcha" },
          ]} />
        </section>
      </div>

      <section className="community-section" aria-label={text.communityLabel}>
        <a className="review-card" href="https://g.page/r/CULdYcpP4womEBE/review" target="_blank" rel="noreferrer">
          <span className="eyebrow">{text.reviewEyebrow}</span>
          <h2>{text.reviewTitle}</h2>
          <p>{text.reviewText}</p>
          <span className="community-link">{text.reviewCta} <ExternalLink size={17} aria-hidden="true" /></span>
        </a>
        <div className="club-card" id="healthy-social-club">
          <span className="eyebrow">{text.clubEyebrow}</span>
          <h2>Good food.<br /><em>Better mood.</em></h2>
          <p>{text.clubText}</p>
          <a className="club-cta" href={CLUB_PLENO_URL} target="_blank" rel="noreferrer">
            <Star size={15} fill="currentColor" aria-hidden="true" /> {text.clubCta} <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <img src={assets.logo} alt="PLENO" />
        <p>Good food. Better mood.</p>
      </footer>

      <button
        className={showTop ? "top-button is-visible" : "top-button"}
        type="button"
        onClick={() => goTo("inicio")}
        aria-label={text.topLabel}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>

      {showWelcome && (
        <div className="welcome-overlay" role="presentation">
          <section className="welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-copy">
            <button className="welcome-dismiss" type="button" onClick={dismissWelcome} aria-label={text.closeWelcome}>
              <X size={20} aria-hidden="true" />
            </button>
            <p className="eyebrow">Club Pleno</p>
            <p className="welcome-points" aria-hidden="true">+10</p>
            <h2 id="welcome-title">{text.welcomeTitle}</h2>
            <p id="welcome-copy">{text.welcomeText}</p>
            <a className="welcome-cta" href={CLUB_PLENO_URL} target="_blank" rel="noreferrer" onClick={dismissWelcome}>
              {text.welcomeCta} <ExternalLink size={18} aria-hidden="true" />
            </a>
            <button className="welcome-secondary" type="button" onClick={dismissWelcome}>{text.welcomeDismiss}</button>
          </section>
        </div>
      )}
    </main>
  );
}
