const BRAND = {
  name: "Octopus Consulting Services",
  short: "Octopus Consulting",
  tagline: "Chennai's Leading Real Estate Consultant",
  address: "No.20/62, A-AA Block, 2nd Ave, Anna Nagar, Chennai, Tamil Nadu 600040",
  phone: "+91 98400 80766",
  phoneTel: "+919840080766",
  whatsapp: "919840080766",
  whatsappMsg:
    "Hi, I found you on your website and I'd like to know more about properties in Chennai.",
  email: "gkr2602@gmail.com",
  facebook: "https://www.facebook.com/octopusconsultingservices/",
  instagram: "https://www.instagram.com/octopusconsultingservices/",
  hours: "Mon \u2013 Sat \xB7 9 AM \u2013 7 PM",
  founded: 2009,
};
const waLink = (msg = BRAND.whatsappMsg) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;
const telLink = `tel:${BRAND.phoneTel}`;
const mailLink = `mailto:${BRAND.email}`;
export { BRAND, mailLink, telLink, waLink };
