"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { properties } from "@/content/properties";
import { PURCHASE_TIMEFRAMES, interestSchema } from "@/lib/leads/types";

type FieldErrors = Partial<Record<"name" | "phone" | "property" | "budgetSar" | "timeframe" | "notes", string>>;

interface Receipt {
  id: string;
  propertyLabel: string;
  demo: boolean;
}

const PROPERTY_OPTIONS = [
  ...properties.map((p) => ({ value: p.slug, label: `${p.name} — حي ${p.district}` })),
  { value: "projects", label: "المشاريع القادمة" },
  { value: "general", label: "استفسار عام" },
];

export function InterestForm({ defaultProperty, compact = false }: { defaultProperty?: string; compact?: boolean }) {
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("property") ?? undefined;
  const initialProperty =
    PROPERTY_OPTIONS.find((o) => o.value === (defaultProperty ?? fromQuery))?.value ?? "general";

  const [property, setProperty] = useState(initialProperty);
  const [prevInitialProperty, setPrevInitialProperty] = useState(initialProperty);
  // مزامنة الاختيار مع تغيّر الرابط (?property=) أثناء التصيير، بدل effect
  if (prevInitialProperty !== initialProperty) {
    setPrevInitialProperty(initialProperty);
    setProperty(initialProperty);
  }
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "failed">("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const uid = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const parsed = interestSchema.safeParse(raw);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { ok: boolean; id?: string; demo?: boolean; error?: string };
      if (!res.ok || !json.ok || !json.id) throw new Error(json.error ?? "تعذر إرسال الطلب");
      setReceipt({
        id: json.id,
        propertyLabel: PROPERTY_OPTIONS.find((o) => o.value === parsed.data.property)?.label ?? parsed.data.property,
        demo: Boolean(json.demo),
      });
      setStatus("done");
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "تعذر إرسال الطلب");
      setStatus("failed");
    }
  }

  if (status === "done" && receipt) {
    return (
      <div className="border border-navy-900/20 bg-ivory-50 p-6 sm:p-8" role="status" aria-live="polite">
        <p className="flex items-center gap-3 text-sm font-medium text-navy-600">
          <span aria-hidden className="inline-block h-px w-8 bg-current" />
          تم استلام الطلب التجريبي
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-navy-900">شكرًا لاهتمامك</h3>
        <p className="mt-2 text-navy-800">
          العقار: <span className="font-medium">{receipt.propertyLabel}</span>
        </p>
        <p className="num mt-1 text-sm text-muted">
          رقم مرجعي تجريبي: <span dir="ltr">{receipt.id}</span>
        </p>
        <p className="mt-5 border-t border-navy-900/15 pt-4 text-sm leading-relaxed text-navy-800">
          <strong className="font-semibold">تنبيه:</strong> هذا طلب تجريبي لأغراض العرض فقط، ولم يُرسل إلى الشركة ولم تُحفظ أي
          بيانات. في النسخة النهائية ستصل الطلبات إلى فريق أكان مباشرة.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReceipt(null);
          }}
          className="mt-5 min-h-11 text-sm font-medium text-navy-900 underline underline-offset-4"
        >
          تسجيل طلب آخر
        </button>
      </div>
    );
  }

  const field = "min-h-12 w-full border border-navy-900/30 bg-ivory-50 px-3 text-base text-navy-900 placeholder:text-muted/70";
  const invalid = "border-red-700 bg-red-50/40";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={`${uid}-demo`}>
      <p id={`${uid}-demo`} className="border-s-2 border-sky-500 bg-sky-300/15 px-4 py-3 text-sm text-navy-800">
        نموذج تجريبي: لا تُرسل البيانات إلى الشركة ولا تُحفظ في هذه المرحلة. يُفضَّل عدم إدخال بيانات حقيقية.
      </p>

      <div className={`grid gap-6 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className="text-sm text-muted">
            الاسم <span aria-hidden className="text-red-700">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={`${field} ${errors.name ? invalid : ""}`}
          />
          {errors.name ? (
            <p id={`${uid}-name-err`} className="text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-phone`} className="text-sm text-muted">
            رقم الجوال <span aria-hidden className="text-red-700">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="05xxxxxxxx"
            required
            aria-required
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            className={`${field} num text-start ${errors.phone ? invalid : ""}`}
          />
          {errors.phone ? (
            <p id={`${uid}-phone-err`} className="text-sm text-red-700">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${uid}-property`} className="text-sm text-muted">
          العقار <span aria-hidden className="text-red-700">*</span>
        </label>
        <select
          id={`${uid}-property`}
          name="property"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          aria-invalid={errors.property ? "true" : undefined}
          className={`${field} ${errors.property ? invalid : ""}`}
        >
          {PROPERTY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.property ? <p className="text-sm text-red-700">{errors.property}</p> : null}
      </div>

      <div className={`grid gap-6 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-budget`} className="text-sm text-muted">
            الميزانية التقريبية (ريال) <span className="text-xs">— اختياري</span>
          </label>
          <input
            id={`${uid}-budget`}
            name="budgetSar"
            type="number"
            inputMode="numeric"
            min={0}
            step={1000}
            dir="ltr"
            placeholder="مثال: 900000"
            aria-invalid={errors.budgetSar ? "true" : undefined}
            className={`${field} num text-start ${errors.budgetSar ? invalid : ""}`}
          />
          {errors.budgetSar ? <p className="text-sm text-red-700">{errors.budgetSar}</p> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-timeframe`} className="text-sm text-muted">
            موعد الشراء المتوقع <span className="text-xs">— اختياري</span>
          </label>
          <select id={`${uid}-timeframe`} name="timeframe" defaultValue="" className={field}>
            <option value="">غير محدد</option>
            {PURCHASE_TIMEFRAMES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact ? (
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-notes`} className="text-sm text-muted">
            ملاحظات <span className="text-xs">— اختياري</span>
          </label>
          <textarea id={`${uid}-notes`} name="notes" rows={3} className={`${field} py-3`} />
          {errors.notes ? <p className="text-sm text-red-700">{errors.notes}</p> : null}
        </div>
      ) : null}

      {serverError ? (
        <p className="border border-red-700/40 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "جارٍ الإرسال…" : "سجّل اهتمامك"}
        </Button>
        <p className="text-xs text-muted">لن يتم التواصل معك في هذه النسخة التجريبية.</p>
      </div>
    </form>
  );
}
