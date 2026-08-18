/**
 * PLENO · Travertino editorial
 * Mobile-first QR menu: calm editorial hierarchy, tactile category rail, real product photography,
 * high-contrast readable pricing, and no decorative UI that competes with food or selection.
 */
import { useEffect, useState } from "react";
import { ArrowUp, ExternalLink, Star } from "lucide-react";

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

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

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
  { id: "bagels-paninos", label: "Bagels & Paninos" },
  { id: "tostas", label: "Tostas" },
  { id: "brunch", label: "Brunch" },
  { id: "bowls-frios", label: "Bowls fríos" },
  { id: "bowls-calientes", label: "Bowls calientes" },
  { id: "acai-protein", label: "Açaí o protein bowl" },
  { id: "dulces", label: "Dulces" },
  { id: "bebidas", label: "Bebidas" },
];

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

const sweet: MenuGroup = {
  title: "Dulces",
  items: [
    { name: "Tarta de zanahoria · saludable, con harina de almendras", price: "4,50 €" },
    { name: "Tarta de banana · saludable, con harina de almendras", price: "4,50 €" },
    { name: "Rol de canela", price: "4,20 €" },
    { name: "Croissant solo", price: "3,50 €" },
    { name: "Croissant de york y queso", price: "5,50 €" },
    { name: "Croissant de ibérico y tomate", price: "6,00 €" },
    { name: "Croissant de atún vegetal", price: "5,90 €" },
    { name: "Croissant de crema de cacao", price: "4,50 €" },
    { name: "Croissant de mantequilla de maní y mermelada", price: "4,50 €" },
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
    { name: "Espresso", price: "3,80 €" },
    { name: "Cortado", price: "3,90 €" },
    { name: "Americano", price: "4,10 €" },
    { name: "Flat White", price: "4,60 €" },
    { name: "Cappuccino", price: "4,60 €" },
    { name: "Latte", price: "4,70 €" },
    { name: "Té e infusiones", price: "4,40 €" },
    { name: "Matcha Latte Caliente", price: "5,90 €" },
    { name: "Matcha Latte Frío", price: "5,90 €" },
    { name: "Strawberry Matcha", price: "6,40 €" },
  ],
};

const kombucha: MenuGroup = {
  title: "Kombucha Miwi",
  items: [
    { name: "Ginger and Lemon", price: "5,00 €" },
    { name: "Wild Berries", price: "5,00 €" },
    { name: "Lime and Mint", price: "5,00 €" },
  ],
};

function MenuList({ group, compact = false, subtleHeading = false }: { group: MenuGroup; compact?: boolean; subtleHeading?: boolean }) {
  return (
    <div className={`menu-list ${compact ? "menu-list--compact" : ""} ${subtleHeading ? "menu-list--subtle" : ""}`}>
      <div className="section-heading">
        {group.eyebrow && <p className="eyebrow">{group.eyebrow}</p>}
        <h2>{group.title}</h2>
        {group.intro && <p className="section-intro">{group.intro}</p>}
        <div className="section-editorial-rule" aria-hidden="true"><span /></div>
      </div>
      <div className="item-stack">
        {group.items.map((item, index) => (
          <article className="menu-item" key={`${item.name}-${index}`}>
            <div className="item-line">
              <h3>{item.name}</h3>
              <span className="item-price">{item.price}</span>
            </div>
            {item.description && <p>{item.description}</p>}
          </article>
        ))}
      </div>
      {group.note && <p className="section-note">{group.note}</p>}
    </div>
  );
}

function ProductPhoto({ src, label, priority = false, fit = "cover" }: { src: string; label: string; priority?: boolean; fit?: "cover" | "contain" | "focus" }) {
  return (
    <figure className={`product-photo product-photo--${fit}`}>
      <div className="photo-frame">
        <img src={src} alt={label} loading={priority ? "eager" : "lazy"} />
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function PhotoCarousel({ slides, label }: { slides: Array<{ src: string; label: string }>; label: string }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  return (
    <figure className="product-carousel" aria-label={label}>
      <div className="carousel-frame">
        <img src={slide.src} alt={slide.label} loading="lazy" />
      </div>
      <figcaption>{slide.label}</figcaption>
      <div className="carousel-nav" role="tablist" aria-label={`Fotos de ${label}`}>
        {slides.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={activeSlide === index}
            aria-label={`Ver ${item.label}`}
            className={activeSlide === index ? "carousel-dot is-active" : "carousel-dot"}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </figure>
  );
}

export default function Home() {
  const [active, setActive] = useState("bagels-paninos");
  const [showTop, setShowTop] = useState(false);

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

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <header className="site-header" aria-label="Cabecera de carta PLENO">
        <div className="header-inner">
          <a className="brand" href="#inicio" aria-label="PLENO, volver al inicio">
            <img src={assets.logo} alt="PLENO" />
          </a>
        </div>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-pronunciation">/ˈple.no/</p>
          <h1 id="hero-title">Estado en el que descubres que cuidarte también puede disfrutarse.</h1>
          <p className="hero-text">Ocurre cuando la buena comida, el tiempo bien invertido y las personas correctas se encuentran en el mismo lugar.</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hero-food" src={assets.salmonBowl} alt="" fetchPriority="high" />
        </div>
      </section>

      <nav className="category-nav" aria-label="Categorías de la carta">
        <div className="category-rail">
          <span className="index-title" aria-hidden="true">Carta</span>
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(item.id)}
              className={active === item.id ? "category-pill is-active" : "category-pill"}
              data-index={`0${index + 1}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="menu-shell">
        <section className="menu-section menu-section--panes" id="bagels-paninos" aria-label="Bagels y paninos">
          <div className="section-number" aria-hidden="true">01</div>
          <div className="panes-flow">
            <div className="panes-chapter">
              <div className="section-copy">
                <MenuList group={bagels} />
              </div>
              <PhotoCarousel label="Bagels y paninos" slides={[
                { src: assets.bagel, label: "Bagel" },
                { src: assets.panino, label: "Panino" },
              ]} />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--panes" id="tostas" aria-label="Tostas">
          <div className="section-number" aria-hidden="true">02</div>
          <div className="panes-flow">
            <div className="panes-chapter panes-chapter--reverse">
              <ProductPhoto src={assets.eggToast} label="Tosta de Aguacate & Huevo Poché" />
              <div className="section-copy">
                <MenuList group={tostas} />
              </div>
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--panes" id="brunch" aria-label="Brunch">
          <div className="section-number" aria-hidden="true">03</div>
          <div className="panes-flow">
            <div className="panes-chapter">
              <div className="section-copy">
                <MenuList group={brunch} />
              </div>
              <PhotoCarousel label="Brunch PLENO" slides={[
                { src: assets.brunchToast, label: "Brunch con tosta" },
                { src: assets.brunchBagel, label: "Brunch con bagel" },
              ]} />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--salads" id="bowls-frios" aria-label="Bowls fríos">
          <div className="section-number" aria-hidden="true">04</div>
          <ProductPhoto src={assets.coldBowl} label="BOWL AVOCADO" />
          <div className="section-copy">
            <MenuList group={saladBowls} />
            <div className="custom-salad-block">
              <MenuList group={customSalad} compact />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--bowls" id="bowls-calientes" aria-label="Bowls calientes">
          <div className="section-number" aria-hidden="true">05</div>
          <div className="section-copy">
            <MenuList group={marketBowls} />
          </div>
          <ProductPhoto src={assets.beefBowl} label="Steak Bowl" priority />
        </section>

        <section className="menu-section menu-section--sweet menu-section--protein" id="acai-protein" aria-label="Açaí o protein bowl">
          <div className="section-number" aria-hidden="true">06</div>
          <div className="section-copy section-copy--paired protein-layout">
            <div className="protein-chapter">
              <MenuList group={acai} />
              <ProductPhoto src={assets.acai} label="Açaí Bowl" />
            </div>
            <div className="protein-chapter">
              <MenuList group={smoothies} />
              <ProductPhoto src={assets.smoothies} label="Protein Smoothies" fit="focus" />
            </div>
          </div>
        </section>

        <section className="menu-section menu-section--sweet" id="dulces" aria-label="Dulces">
          <div className="section-number" aria-hidden="true">07</div>
          <div className="section-copy">
            <MenuList group={sweet} />
          </div>
        </section>

        <section className="menu-section menu-section--drinks" id="bebidas" aria-label="Bebidas">
          <div className="section-number" aria-hidden="true">08</div>
          <div className="section-copy drinks-layout">
            <MenuList group={juices} />
            <div className="drink-photos" aria-label="Bebidas PLENO">
              <ProductPhoto src={assets.juices} label="Zumos naturales" fit="focus" />
            </div>
            <div className="subsection-divider" />
            <MenuList group={coffee} compact />
            <MenuList group={kombucha} compact subtleHeading />
          </div>
          <PhotoCarousel label="Café y Matcha" slides={[
            { src: assets.coffee, label: "Café PLENO" },
            { src: assets.matcha, label: "Matcha" },
          ]} />
        </section>
      </div>

      <section className="community-section" aria-label="Comunidad PLENO">
        <a className="review-card" href="https://g.page/r/CULdYcpP4womEBE/review" target="_blank" rel="noreferrer">
          <span className="eyebrow">PINALE Brunch & Market Bowls</span>
          <h2>Queremos saber tu opinión.</h2>
          <p>Publica una reseña en nuestro perfil.</p>
          <span className="community-link">Dejar reseña <ExternalLink size={17} aria-hidden="true" /></span>
        </a>
        <div className="club-card" id="healthy-social-club">
          <span className="eyebrow">Healthy Social Club</span>
          <h2>Good food.<br /><em>Better mood.</em></h2>
          <p>Próximamente: beneficios y descuentos para nuestra comunidad.</p>
          <span className="club-status"><Star size={14} fill="currentColor" aria-hidden="true" /> Próximamente</span>
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
        aria-label="Volver al inicio de la carta"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </main>
  );
}
