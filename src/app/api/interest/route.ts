import { NextResponse } from "next/server";
import { interestSchema } from "@/lib/leads/types";
import { getLeadsRepository } from "@/lib/leads/repository";

/**
 * استقبال طلب اهتمام. في وضع الديمو يُتحقق من البيانات ويُعاد إيصال تجريبي دون حفظ أو إرسال.
 * لاحقًا: استبدال DemoLeadsRepository بمستودع دائم، وإضافة إشعار (بريد/واتساب) هنا.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "صيغة الطلب غير صحيحة" }, { status: 400 });
  }

  const parsed = interestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "تحقق من البيانات المدخلة", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }

  const repo = getLeadsRepository();
  const stored = await repo.save(parsed.data);

  return NextResponse.json({ ok: true, id: stored.id, demo: stored.demo, mode: repo.mode }, { status: 201 });
}
