import { randomUUID } from "crypto";
import { db } from "@/db";
import { quizSessions } from "@/db/schema";
import { scoreQuiz } from "@/lib/quiz";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      answers?: Record<string, string>;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const answers = body.answers ?? {};

    if (!name || !email.includes("@") || Object.keys(answers).length < 6) {
      return Response.json({ error: "Please complete the quiz and leave a valid email." }, { status: 400 });
    }

    const result = scoreQuiz(answers);
    const publicId = randomUUID();

    await db.insert(quizSessions).values({
      publicId,
      name,
      email,
      answers,
      scores: result.scores,
      primaryCategory: result.primary,
      secondaryCategory: result.secondary,
      recommendedBookSlug: result.recommendedBookSlug,
    });

    return Response.json({ publicId });
  } catch {
    return Response.json({ error: "Could not save your quiz." }, { status: 500 });
  }
}
