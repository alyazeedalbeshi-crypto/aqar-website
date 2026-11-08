import type { InterestLead, StoredLead } from "./types";

/**
 * واجهة تخزين طلبات الاهتمام.
 * في وضع الديمو لا يُحفظ أي شيء (DemoLeadsRepository). عند الانتقال للإنتاج تُضاف
 * نسخة متصلة بقاعدة بيانات (مثلاً Postgres/Supabase) وتُبدَّل في getLeadsRepository فقط،
 * فيبقى النموذج ومسار /api/interest ولوحة الإدارة المستقبلية دون تغيير.
 */
export interface LeadsRepository {
  readonly mode: "demo" | "persistent";
  save(lead: InterestLead): Promise<StoredLead>;
  list(): Promise<StoredLead[]>;
}

function newId(): string {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** لا يحفظ البيانات إطلاقًا — يعيد إيصالًا تجريبيًا فقط */
export class DemoLeadsRepository implements LeadsRepository {
  readonly mode = "demo" as const;
  async save(lead: InterestLead): Promise<StoredLead> {
    return { ...lead, id: newId(), createdAt: new Date().toISOString(), demo: true };
  }
  async list(): Promise<StoredLead[]> {
    return [];
  }
}

let repository: LeadsRepository | null = null;

export function getLeadsRepository(): LeadsRepository {
  if (!repository) repository = new DemoLeadsRepository();
  return repository;
}
