export interface CollectionItem {
  id: string;
  label: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export const collections: CollectionItem[] = [
  {
    id: "festive-edit",
    label: "Festive",
    title: "Festive Edit",
    image: "/images/collections/collection-01.webp",
    alt: "VIPASI festive edit",
    href: "/collections/festive-edit",
  },
  {
    id: "sarees",
    label: "Handloom",
    title: "Sarees",
    image: "/images/collections/collection-02.webp",
    alt: "VIPASI handloom sarees",
    href: "/collections/sarees",
  },
  {
    id: "anarkali-edit",
    label: "Statement",
    title: "Anarkali Edit",
    image: "/images/collections/collection-03.webp",
    alt: "VIPASI anarkali edit",
    href: "/collections/anarkali-edit",
  },
  {
    id: "signature-sets",
    label: "Everyday",
    title: "Signature Sets",
    image: "/images/collections/collection-04.webp",
    alt: "VIPASI signature sets",
    href: "/collections/signature-sets",
  },
];
