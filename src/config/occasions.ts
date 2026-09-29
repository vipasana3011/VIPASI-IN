export interface OccasionItem {
  id: string;
  title: string;
  tagline: string;
  tag: string;
  count: string;
  image: string;
  link: string;
}

export const occasionsConfig: OccasionItem[] = [
  {
    id: 'haldi',
    title: 'Haldi Sunshine',
    tagline: 'Marigold & Lemon Glow',
    tag: 'Haldi',
    count: '6 Outfits',
    // Place your Canva image at: public/images/occasions/haldi.jpg
    image: '/images/occasions/haldi.jpg',
    link: '#collections',
  },
  {
    id: 'sangeet',
    title: 'Mehendi & Sangeet',
    tagline: 'Twirl-Ready Shararas & Kalis',
    tag: 'Mehendi',
    count: '12 Outfits',
    // Place your Canva image at: public/images/occasions/sangeet.jpg
    image: '/images/occasions/sangeet.jpg',
    link: '#collections',
  },
  {
    id: 'festive',
    title: 'Festive Puja & Diwali',
    tagline: 'Pure Chanderi & Gajji Silk',
    tag: 'Festive',
    count: '15 Outfits',
    // Place your Canva image at: public/images/occasions/festive.jpg
    image: '/images/occasions/festive.jpg',
    link: '#collections',
  },
  {
    id: 'wedding',
    title: 'Royal Wedding Guest',
    tagline: 'Heirloom Lehengas & Brocades',
    tag: 'Wedding',
    count: '8 Outfits',
    // Place your Canva image at: public/images/occasions/wedding.jpg
    image: '/images/occasions/wedding.jpg',
    link: '#collections',
  },
];
