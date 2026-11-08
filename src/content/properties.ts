/**
 * محتوى العقارات — المصدر: كتيب «مزاد روح جدة» (public/brochures/rooh-jeddah-auction.pdf).
 * كل القيم منقولة كما وردت في الكتيب. القيم المعرّفة (أرقام الصكوك والقطع والمخططات)
 * مخزّنة بترتيبها البصري كما تظهر في الكتيب وتُعرض داخل عنصر dir="ltr".
 */

export type PropertyType = "land";
export type BoundarySide = "north" | "south" | "east" | "west";

export interface Boundary {
  side: BoundarySide;
  /** النص كما ورد في الكتيب */
  text: string;
}

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Property {
  slug: string;
  /** الترتيب في الكتيب (01–04) */
  order: number;
  name: string;
  type: PropertyType;
  district: string;
  city: string;
  /** وصف الواجهة كما ورد في الكتيب */
  frontage: string;
  areaSqm: number;
  openingPriceSar: number;
  depositSar: number;
  deedStatus: string;
  /** معرّفات الوثيقة — قد يختلف نوع المعرّف بين عقار وآخر حسب الكتيب */
  identifiers: { label: string; value: string }[];
  boundaries: Boundary[];
  image: PropertyImage;
  /** رابط «صور إضافية» كما ورد في الكتيب (مجلد خارجي) */
  externalPhotosUrl?: string;
  auctionSlug: "rooh-jeddah";
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  land: "أرض",
};

export const BOUNDARY_SIDE_LABELS: Record<BoundarySide, string> = {
  north: "شمالاً",
  south: "جنوباً",
  east: "شرقاً",
  west: "غرباً",
};

export const properties: Property[] = [
  {
    slug: "ard-al-zuhoor",
    order: 1,
    name: "أرض الزهور",
    type: "land",
    district: "الزهور",
    city: "جدة",
    frontage: "بواجهة جنوبية على شارع عرض 16 م",
    areaSqm: 900,
    openingPriceSar: 1_790_000,
    depositSar: 5_000,
    deedStatus: "مسجل عيني",
    identifiers: [
      { label: "رقم الصك", value: "493737005179" },
      { label: "رقم القطعة", value: "3261 / 1 / م" },
      { label: "رقم المخطط", value: "244 / ج / س" },
      { label: "نسبة التملك", value: "100%" },
    ],
    boundaries: [
      { side: "north", text: "قطعة رقم 3260 بطول 25 م" },
      { side: "south", text: "شارع بعرض 16 متر طول 25 متر وواجهتها على شارع 16 متر" },
      { side: "east", text: "قطعة رقم 3259 بطول 36 م" },
      { side: "west", text: "قطعة رقم 3263 بطول 36 م" },
    ],
    image: {
      src: "/images/properties/land-zuhoor.jpg",
      alt: "صورة جوية لأرض الزهور مع تحديد حدود القطعة",
      width: 1080,
      height: 607,
    },
    externalPhotosUrl: "https://drive.google.com/drive/folders/1MQrMnaixy6mWajxiDjRKh3lDNqPG76yg",
    auctionSlug: "rooh-jeddah",
  },
  {
    slug: "ard-al-murooj",
    order: 2,
    name: "أرض المروج",
    type: "land",
    district: "المروج",
    city: "جدة",
    frontage: "بواجهتين جنوبية 40 م وغربية على شارع 15 م",
    areaSqm: 723.5,
    openingPriceSar: 939_000,
    depositSar: 10_000,
    deedStatus: "فعالة، ولا توجد قيود مسجلة",
    identifiers: [
      { label: "رقم الصك", value: "360689001565" },
      { label: "رقم القطعة", value: "124" },
      { label: "رقم المخطط", value: "3/ج/س/المعدل" },
      { label: "نسبة التملك", value: "100%" },
    ],
    boundaries: [
      { side: "north", text: "قطعة رقم 125 – طول 26 م" },
      { side: "south", text: "شارع عرض 40 م – طول 23 م وواجهتها على شارع 40 متر" },
      { side: "east", text: "قطعة رقم 126 – طول 28 م" },
      { side: "west", text: "شارع عرض 15 م – طول 25 م وواجهتها على شارع 15 متر" },
    ],
    image: {
      src: "/images/properties/land-murooj.jpg",
      alt: "صورة جوية لأرض المروج مع تحديد حدود القطعة",
      width: 1422,
      height: 800,
    },
    externalPhotosUrl: "https://drive.google.com/drive/folders/19Xa07Llwdue89qIOCon5u8ZFGl--HByb",
    auctionSlug: "rooh-jeddah",
  },
  {
    slug: "ard-al-wafaa",
    order: 3,
    name: "أرض الوفاء",
    type: "land",
    district: "الوفاء",
    city: "جدة",
    frontage: "بواجهة شرقية على شارع عرض 25 م",
    areaSqm: 900,
    openingPriceSar: 880_000,
    depositSar: 5_000,
    deedStatus: "فعالة، ولا توجد قيود مسجلة",
    identifiers: [
      { label: "رقم الصك", value: "493667000694" },
      { label: "رقم القطعة", value: "2098/أ" },
      { label: "رقم المخطط", value: "169/ج/س" },
      { label: "نسبة التملك", value: "100%" },
    ],
    boundaries: [
      { side: "north", text: "قطعة رقم 2099 بطول 40 متر" },
      { side: "south", text: "قطعة رقم 2097 بطول 40 متر" },
      { side: "east", text: "شارع عرض 25 متر بطول 22.5 متر" },
      { side: "west", text: "القطعة رقم 2100 وجزء من القطعة رقم 2101 بطول 22.5 متر" },
    ],
    image: {
      src: "/images/properties/land-wafaa.jpg",
      alt: "صورة جوية لأرض الوفاء مع تحديد حدود القطعة",
      width: 1192,
      height: 670,
    },
    externalPhotosUrl: "https://drive.google.com/drive/folders/1IrP89Y0zsrPizZSZJrxB0gxdO2zLLNWV",
    auctionSlug: "rooh-jeddah",
  },
  {
    slug: "ard-al-abeer",
    order: 4,
    name: "أرض العبير",
    type: "land",
    district: "العبير",
    city: "جدة",
    frontage: "بواجهة شرقية على شارع عرض 32 م",
    areaSqm: 437.5,
    openingPriceSar: 409_000,
    depositSar: 3_000,
    deedStatus: "فعالة، ولا توجد قيود مسجلة",
    identifiers: [
      { label: "رقم الهوية العقارية", value: "2257524472820001" },
      { label: "رقم القطعة", value: "2/1/أ/931" },
      { label: "تاريخ الوثيقة", value: "1447/11/11هـ الموافق 2026/04/28م" },
      { label: "رقم وثيقة التملك", value: "160026574518" },
    ],
    boundaries: [
      { side: "north", text: "رقم القطعة 929 بطول 35 م" },
      { side: "south", text: "رقم القطعة 2/931 بطول 35 م" },
      { side: "east", text: "شارع عرض 32 م بطول 12.5 م" },
      { side: "west", text: "رقم القطعة 932 بطول 12.5 م" },
    ],
    image: {
      src: "/images/properties/land-abeer.jpg",
      alt: "صورة جوية لأرض العبير مع تحديد حدود القطعة",
      width: 2000,
      height: 1125,
    },
    externalPhotosUrl: "https://drive.google.com/drive/folders/1gcj0St7dy1VLjBqxvoDMwE-WFJDIRlKl",
    auctionSlug: "rooh-jeddah",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getDistricts(): string[] {
  return Array.from(new Set(properties.map((p) => p.district)));
}

export function getPropertyTypes(): PropertyType[] {
  return Array.from(new Set(properties.map((p) => p.type)));
}
