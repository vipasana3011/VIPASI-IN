export interface HeroSlide {
  id: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  link: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    // Place your Canva desktop banner here: public/images/hero/desktop-1.jpg (1920x1080)
    // Place your Canva mobile banner here:  public/images/hero/mobile-1.jpg  (1080x1350 or 1080x1920)
    desktopImage: '/images/hero/desktop-1.jpg',
    mobileImage: '/images/hero/mobile-1.jpg',
    alt: 'VIPASI Festive Noor Edit',
    link: '#collections',
  },
  {
    id: 'hero-2',
    // Place your Canva desktop banner here: public/images/hero/desktop-2.jpg
    // Place your Canva mobile banner here:  public/images/hero/mobile-2.jpg
    desktopImage: '/images/hero/desktop-2.jpg',
    mobileImage: '/images/hero/mobile-2.jpg',
    alt: 'VIPASI Royal Wedding Couture',
    link: '#collections',
  },
  {
    id: 'hero-3',
    // Place your Canva desktop banner here: public/images/hero/desktop-3.jpg
    // Place your Canva mobile banner here:  public/images/hero/mobile-3.jpg
    desktopImage: '/images/hero/desktop-3.jpg',
    mobileImage: '/images/hero/mobile-3.jpg',
    alt: 'VIPASI Handloom Sarees',
    link: '#collections',
  },
  {
    id: 'hero-4',
    // Place your Canva desktop banner here: public/images/hero/desktop-4.jpg
    // Place your Canva mobile banner here:  public/images/hero/mobile-4.jpg
    desktopImage: '/images/hero/desktop-4.jpg',
    mobileImage: '/images/hero/mobile-4.jpg',
    alt: 'VIPASI Mirror Work Sharara Sets',
    link: '#collections',
  },
];
