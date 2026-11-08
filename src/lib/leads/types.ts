import { z } from "zod";

export const PURCHASE_TIMEFRAMES = [
  { value: "within-month", label: "خلال شهر" },
  { value: "1-3-months", label: "خلال 1–3 أشهر" },
  { value: "3-6-months", label: "خلال 3–6 أشهر" },
  { value: "later", label: "لاحقًا / أستكشف الخيارات" },
] as const;

export type PurchaseTimeframe = (typeof PURCHASE_TIMEFRAMES)[number]["value"];

/** رقم جوال سعودي: 05xxxxxxxx أو 9665xxxxxxxx أو +9665xxxxxxxx */
export const saudiMobileRegex = /^(?:\+?966|0)5\d{8}$/;

export const interestSchema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جدًا").max(80, "الاسم طويل جدًا"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => saudiMobileRegex.test(v), "أدخل رقم جوال سعودي صحيح (مثال: 05xxxxxxxx)"),
  /** slug العقار، أو "projects" للمشاريع القادمة، أو "general" */
  property: z.string().trim().min(1, "اختر العقار"),
  budgetSar: z
    .union([z.literal(""), z.coerce.number().positive("أدخل مبلغًا صحيحًا").max(1_000_000_000)])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  timeframe: z
    .union([z.literal(""), z.enum(PURCHASE_TIMEFRAMES.map((t) => t.value) as [PurchaseTimeframe, ...PurchaseTimeframe[]])])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  notes: z.string().trim().max(500, "الملاحظات طويلة جدًا").optional(),
});

export type InterestInput = z.input<typeof interestSchema>;
export type InterestLead = z.output<typeof interestSchema>;

export interface StoredLead extends InterestLead {
  id: string;
  createdAt: string;
  /** يُعلَّم true في وضع الديمو لتوضيح أن الطلب لم يُرسل للشركة */
  demo: boolean;
}
