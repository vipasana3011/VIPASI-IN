export interface FooterHotspot {
  id: string;
  name: string;
  tagline: string;
  description: string;
  link: string;
  desktop: { x: number; y: number }; // percentage (0 - 100)
  mobile: { x: number; y: number };  // percentage (0 - 100)
}

export interface FooterSceneConfig {
  desktopImage: string;
  mobileImage: string;
  desktopAspectRatio: string; // "1024 / 341" = 3.0
  mobileAspectRatio: string;  // "819 / 1024" = 0.8
  sun: {
    desktop: { x: number; y: number; size: number };
    mobile: { x: number; y: number; size: number };
    riseDistance: number;
    rotationDuration: number;
  };
  clouds: {
    show: boolean;
    speedFactor: number;
  };
  birds: {
    show: boolean;
    count: number;
  };
  kites: {
    show: boolean;
    count: number;
  };
  sparkles: {
    show: boolean;
    count: number;
  };
  diyaGlow: {
    show: boolean;
    desktop: { x: number; y: number };
    mobile: { x: number; y: number };
  };
  garland: {
    show: boolean;
  };
  particles: {
    show: boolean;
    count: number;
  };
  rotatingBadge: {
    show: boolean;
    text: string;
  };
  hotspots: FooterHotspot[];
}

export const footerSceneConfig: FooterSceneConfig = {
  desktopImage: '/images/footer/footer-scene.png',
  mobileImage: '/images/footer/footer-scene-m.png',
  desktopAspectRatio: '1024 / 341',
  mobileAspectRatio: '819 / 1024',
  sun: {
    // Sits directly behind the majestic central Haveli archway
    desktop: { x: 45.6, y: 19.5, size: 140 },
    mobile: { x: 50.0, y: 31.0, size: 120 },
    riseDistance: 45,
    rotationDuration: 40,
  },
  clouds: {
    show: true,
    speedFactor: 1.0,
  },
  birds: {
    show: true,
    count: 4,
  },
  kites: {
    show: true,
    count: 2,
  },
  sparkles: {
    show: true,
    count: 12,
  },
  diyaGlow: {
    show: true,
    desktop: { x: 88.0, y: 88.0 },
    mobile: { x: 91.0, y: 86.0 },
  },
  garland: {
    show: true,
  },
  particles: {
    show: true,
    count: 36,
  },
  rotatingBadge: {
    show: true,
    text: 'HANDCRAFTED HERITAGE • MADE IN INDIA • ',
  },
  hotspots: [
    {
      id: 'charkha',
      name: 'Hand-spun Yarn',
      tagline: 'Traditional Swadeshi Khadi',
      description: 'Spinning organic indigenous cotton and Mulberry silk into ultra-fine gossamer threads.',
      link: '#collections',
      desktop: { x: 6.5, y: 61.5 },
      mobile: { x: 10.0, y: 72.0 },
    },
    {
      id: 'loom',
      name: 'Handloom Weaving',
      tagline: 'Pit-Loom Zari Mastery',
      description: 'Hand-interlocked warp and weft creating timeless Banarasi kadwa and Chanderi motifs.',
      link: '#collections',
      desktop: { x: 24.2, y: 55.7 },
      mobile: { x: 16.5, y: 62.5 },
    },
    {
      id: 'marigolds',
      name: 'Festive Edit',
      tagline: 'Auspicious Genda Phool',
      description: 'Vibrant celebratory hues inspired by temple marigolds and joyful Indian festivities.',
      link: '#collections',
      desktop: { x: 31.0, y: 67.4 },
      mobile: { x: 30.5, y: 68.3 },
    },
    {
      id: 'embroidery-hoop',
      name: 'Aari & Zardozi',
      tagline: 'Royal Needle Hook Heritage',
      description: 'Master artisan hand-stitching gold dabka wire, sequins, and silk thread onto pure tissue.',
      link: '#collections',
      desktop: { x: 47.0, y: 68.9 },
      mobile: { x: 54.0, y: 66.8 },
    },
    {
      id: 'wooden-blocks',
      name: 'Handblock Dabu',
      tagline: 'Mud-Resist Teak Carvings',
      description: 'Hand-carved wooden blocks precision-stamped with natural vegetable and mud pigments.',
      link: '#collections',
      desktop: { x: 68.0, y: 77.7 },
      mobile: { x: 80.0, y: 75.0 },
    },
    {
      id: 'peacock',
      name: 'Heritage Motifs',
      tagline: 'Royal Mayura of Jaipur',
      description: 'Iconic royal court motif representing grace, purity, and Rajasthan’s avian legacy.',
      link: '#collections',
      desktop: { x: 74.5, y: 58.6 },
      mobile: { x: 74.5, y: 58.6 },
    },
  ],
};
