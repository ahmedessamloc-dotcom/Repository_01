import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import {
  projects,
  awards,
  experiences,
  competencies,
  partners,
  mapLocations,
  aboutData,
} from "@/lib/portfolio-data";

// ---------------------------------------------------------------------------
// Vercel serverless function config — allow up to 60s
// ---------------------------------------------------------------------------
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Cache the ZAI SDK client — avoid re-creating on every request
// ---------------------------------------------------------------------------
let zaiClient: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZaiClient() {
  if (!zaiClient) {
    zaiClient = await ZAI.create();
  }
  return zaiClient;
}

// ---------------------------------------------------------------------------
// Build a COMPACT knowledge base — dramatically smaller than before
// Only include essential facts, not full descriptions
// Previous version was ~73K tokens; this targets ~8-10K tokens
// ---------------------------------------------------------------------------

function buildCompactKnowledgeBase(): string {
  const lines: string[] = [];

  // Contact & Bio (essential)
  lines.push(`# Ahmed Essam — Portfolio Knowledge Base`);
  lines.push(`Name: ${aboutData.name}`);
  lines.push(`Title: ${aboutData.title}`);
  lines.push(`Phone: ${aboutData.phone}`);
  lines.push(`Email: ${aboutData.email}`);
  lines.push(`LinkedIn: ${aboutData.linkedin}`);
  lines.push(`Location: ${aboutData.location}`);
  lines.push(`Bio: ${aboutData.bio}`);
  lines.push(`Specialties: ${aboutData.specialties.join(", ")}`);
  lines.push(
    `Stats: ${aboutData.stats.map((s) => `${s.value} ${s.label}`).join(" | ")}`
  );

  // Career Timeline (concise)
  lines.push(`\n## CAREER TIMELINE`);
  for (const exp of experiences) {
    lines.push(
      `- ${exp.period} | ${exp.role} at ${exp.company} (${exp.location}) [${exp.type}]`
    );
  }

  // Awards (concise)
  lines.push(`\n## AWARDS`);
  for (const a of awards) {
    lines.push(`- ${a.title} — ${a.type}: ${a.project} (${a.year})`);
  }

  // Projects — compact format with short descriptions
  lines.push(`\n## PROJECTS (${projects.length} total)`);
  for (const p of projects) {
    const shortDesc = p.description.length > 120
      ? p.description.slice(0, 117) + "..."
      : p.description;
    const imgs = p.images.length > 0 ? ` | Images: ${p.images.join(", ")}` : "";
    lines.push(
      `- [${p.id}] ${p.title} | ${p.category} | ${p.year} | ${p.location} | Client: ${p.client}${p.budget ? ` | Budget: ${p.budget}` : ""}${p.award ? ` | Award: ${p.award}` : ""}${imgs}`
    );
    lines.push(`  ${shortDesc}`);
  }

  // Competencies (compact)
  lines.push(`\n## COMPETENCIES`);
  for (const c of competencies) {
    lines.push(`- ${c.category}: ${c.items.join(", ")}`);
  }

  // Map locations (compact)
  lines.push(`\n## LOCATIONS`);
  for (const loc of mapLocations) {
    if (loc.projects.length > 0) {
      lines.push(`- ${loc.city}, ${loc.country}: ${loc.projects.join(", ")}`);
    }
  }

  // Partners (compact)
  lines.push(`\n## PARTNERS`);
  for (const cat of partners) {
    lines.push(`- ${cat.category}: ${cat.entries.map((e) => e.name).join(", ")}`);
  }

  return lines.join("\n");
}

const KNOWLEDGE_BASE = buildCompactKnowledgeBase();

// ---------------------------------------------------------------------------
// System prompt builder — optimized for speed
// ---------------------------------------------------------------------------

function buildSystemPrompt(language: string = "english"): string {
  const isArabic = language === "arabic";

  const langRule = isArabic
    ? `Respond in Arabic (اللغة العربية). Keep project names and proper nouns in English. If user writes English, still respond Arabic unless they request English.`
    : `Respond in English. If user writes Arabic, respond in Arabic naturally. Keep project names in original form.`;

  const notFound = isArabic
    ? `ليس لدي هذه المعلومات. يمكنك السؤال عن مشاريع أحمد أو خبرته أو جوائزه أو مهاراته أو مواقع المشاريع أو تفاصيل الاتصال.`
    : `I don't have that information. Ask me about Ahmed's projects, experience, awards, skills, locations, or contact details.`;

  const intro = isArabic
    ? `أنت مساعد محفظة أحمد عصام المهنية. أحمد مهندس معماري ومدير مشاريع بخبرة 20+ عاماً في 6+ دول.`
    : `You are the AI assistant for Ahmed Essam's portfolio. Ahmed is a Senior Architect & Project Manager with 20+ years across 6+ countries.`;

  const imageRule = isArabic
    ? `عند سؤالك عن مشروع، أضف صوره بصيغة Markdown: ![وصف](/مسار.jpg). أقصى 4 صور لكل رد.`
    : `When asked about a project, include its images using: ![description](/path.jpg). Max 4 images per response.`;

  return `${intro}

RULES:
1. ONLY use data from the knowledge base below.
2. NEVER fabricate or use outside information.
3. If not in knowledge base, say: "${notFound}"
4. You are exclusively Ahmed Essam's portfolio assistant.

${langRule}

STYLE: Professional, warm, use markdown formatting. Be concise with bullet points.

${imageRule}

DOWNLOADABLE: CV (Ahmed_Essam_CV.pdf), Portfolio (Ahmed_Essam_Portfolio.pdf), Projects List (Ahmed_Essam_Projects_List.pdf) — in Downloads section.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;
}

// ---------------------------------------------------------------------------
// POST /api/chat — handle chat messages (optimized)
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const { messages, language } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Only send last 8 messages to reduce token count
    const recentMessages = messages.slice(-8);

    const systemPrompt = buildSystemPrompt(language || "english");

    const zai = await getZaiClient();

    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...recentMessages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    // Add timeout protection (25s) — prevents Vercel function hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    let completion;
    try {
      completion = await zai.chat.completions.create({
        messages: chatMessages,
        temperature: 0.5,
        max_tokens: 1000,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const reply =
      completion.choices?.[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Handle AbortError (timeout) specifically
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          error: "Response timeout",
          details: "The AI service took too long to respond. Please try again.",
        },
        { status: 504 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to generate response", details: message },
      { status: 500 }
    );
  }
}
