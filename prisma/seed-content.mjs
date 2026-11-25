// Starting content for the database. Used by prisma/seed.mjs. Safe to edit.
const unsplash = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services = [
  {
    slug: "residential",
    title: "Residential Interiors",
    summary:
      "End-to-end design for apartments, villas and bungalows, from layout planning to the final styling.",
    points: ["Space planning & 3D visualisation", "Living, dining & bedroom design", "False ceilings, lighting & flooring", "Furniture & décor curation"],
    image: unsplash("1600121848594-d8644e57abab", 1000),
  },
  {
    slug: "commercial",
    title: "Commercial Interiors",
    summary:
      "Offices, retail stores, cafés and clinics designed to strengthen your brand and keep people productive.",
    points: ["Workplace & office design", "Retail & showroom fit-outs", "Restaurants & hospitality", "Brand-led spatial identity"],
    image: unsplash("1524758631624-e2822e304c36", 1000),
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchens",
    summary:
      "Ergonomic kitchens built to your cooking style, with premium hardware and finishes that last.",
    points: ["L, U, parallel & island layouts", "Soft-close hardware & smart storage", "Quartz, granite & solid-surface tops", "Chimney & appliance integration"],
    image: unsplash("1600489000022-c2086d79f9d4", 1000),
  },
  {
    slug: "bedroom-wardrobes",
    title: "Bedrooms & Wardrobes",
    summary:
      "Calm, restful bedrooms with made-to-measure wardrobes, beds and walk-in closets.",
    points: ["Sliding & hinged wardrobes", "Walk-in closets", "Upholstered beds & headboards", "Kids' & guest rooms"],
    image: unsplash("1505693416388-ac5ce068fe85", 1000),
  },
  {
    slug: "furniture-decor",
    title: "Custom Furniture & Décor",
    summary:
      "Bespoke furniture, soft furnishings and art that give every room its own character.",
    points: ["Made-to-order furniture", "Curtains, rugs & upholstery", "Art & accessory styling", "Indoor plants & greenery"],
    image: unsplash("1586023492125-27b2c045efd7", 1000),
  },
  {
    slug: "renovation",
    title: "Renovation & Turnkey",
    summary:
      "Complete makeovers handled by one team, covering civil work, electrical, plumbing, painting and handover.",
    points: ["Civil & structural changes", "Electrical & plumbing", "Painting & wall finishes", "Single point of contact"],
    image: unsplash("1554995207-c18c203602cb", 1000),
  },
];

export const projects = [
  { title: "Emerald Living Room", location: "Baner, Pune", category: "Residential", size: "3 BHK · 1,650 sq ft", image: unsplash("1615873968403-89e068629265") },
  { title: "Green Velvet Dining", location: "Koregaon Park, Pune", category: "Residential", size: "Villa · 3,200 sq ft", image: unsplash("1617806118233-18e1de247200") },
  { title: "Charcoal Modular Kitchen", location: "Wakad, Pune", category: "Kitchen", size: "L-shaped · 140 sq ft", image: unsplash("1588854337236-6889d631faa8") },
  { title: "Soft Neutral Lounge", location: "Aundh, Pune", category: "Residential", size: "2 BHK · 1,100 sq ft", image: unsplash("1631679706909-1844bbd07221") },
  { title: "Collaborative Workspace", location: "Hinjewadi, Pune", category: "Commercial", size: "Office · 6,000 sq ft", image: unsplash("1524758631624-e2822e304c36") },
  { title: "White Island Kitchen", location: "Kharadi, Pune", category: "Kitchen", size: "Island · 220 sq ft", image: unsplash("1507089947368-19c1da9775ae") },
  { title: "Serene Master Bedroom", location: "Viman Nagar, Pune", category: "Residential", size: "4 BHK · 2,400 sq ft", image: unsplash("1505693416388-ac5ce068fe85") },
  { title: "Tech Startup Office", location: "Magarpatta, Pune", category: "Commercial", size: "Office · 4,500 sq ft", image: unsplash("1497366216548-37526070297c") },
  { title: "Classic Gallery Living", location: "Bavdhan, Pune", category: "Residential", size: "3 BHK · 1,800 sq ft", image: unsplash("1600210492486-724fe5c67fb0") },
  { title: "Monochrome Family Kitchen", location: "Hadapsar, Pune", category: "Kitchen", size: "U-shaped · 160 sq ft", image: unsplash("1484154218962-a197022b5858") },
  { title: "Open-Plan Studio Office", location: "Shivajinagar, Pune", category: "Commercial", size: "Studio · 1,200 sq ft", image: unsplash("1502672260266-1c1ef2d93688") },
  { title: "Warm Wood Media Wall", location: "Pimple Saudagar, Pune", category: "Residential", size: "2 BHK · 980 sq ft", image: unsplash("1594026112284-02bb6f3352fe") },
];

export const testimonials = [
  {
    name: "Priya & Amit Sharma",
    project: "3 BHK Apartment, Baner",
    rating: 5,
    quote:
      "Areaplanz Design turned our empty flat into a home we never want to leave. The 3D designs matched the final result exactly, and they finished a week early!",
  },
  {
    name: "Neha Joshi",
    project: "Modular Kitchen, Wakad",
    rating: 5,
    quote:
      "The kitchen is so well planned. Every drawer has a purpose. Karan understood exactly how I cook. The quality of the hardware is excellent.",
  },
  {
    name: "Vikram Patil",
    project: "Office Interiors, Hinjewadi",
    rating: 5,
    quote:
      "Our team loves the new office. Areaplanz Design managed everything from civil work to furniture, so we only had to deal with one team. Highly professional.",
  },
  {
    name: "Sneha Deshmukh",
    project: "Villa, Koregaon Park",
    rating: 5,
    quote:
      "Elegant, warm and very practical. Ananya has a wonderful eye for detail, and the transparent pricing gave us real peace of mind.",
  },
  {
    name: "Rahul Agarwal",
    project: "2 BHK Renovation, Aundh",
    rating: 4,
    quote:
      "A complete renovation in 8 weeks with regular updates on WhatsApp. The site supervisor was always reachable. Would recommend them to anyone.",
  },
  {
    name: "Meera Iyer",
    project: "Café Interiors, Shivajinagar",
    rating: 5,
    quote:
      "Our café finally feels like our brand. Customers keep complimenting the space, and many of them take photos for Instagram!",
  },
];
