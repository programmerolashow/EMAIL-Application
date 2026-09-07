import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import { extractedActionItemsSchema, type ExtractedActionItem } from "./types";

export class ActionItemExtractor {
  public static async extractActionItems(
    userId: string,
    emailOrThreadId: string,
    isThread = false,
    accountId?: string
  ): Promise<ExtractedActionItem[]> {
    const target = isThread
      ? await EmailService.getThread(userId, emailOrThreadId, accountId)
      : await EmailService.getMessage(userId, emailOrThreadId, accountId);
    return this.extract(target);
  }

  public static async extract(
    target: NormalizedMessage | EmailThread
  ): Promise<ExtractedActionItem[]> {
    const isThread = "messages" in target;
    const sourceEmailId = target.id;
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target)
      : `SUBJECT: ${target.subject}\nFROM: ${target.from.name ?? target.from.address}\nDATE: ${target.receivedAt}\n\n${AIContextBuilder.sanitizeText(target.body, 1200)}`;

    const fallbackTask = `Follow up on "${target.subject}"`;
    const fallback: ExtractedActionItem[] = [
      {
        taskDescription: fallbackTask,
        task: fallbackTask,
        assignedOwner: null,
        owner: "User",
        deadline: null,
        priority: "Medium",
        sourceEmailId,
      },
    ];

    const systemPrompt = `You are an executive action item extraction engine.
Extract all actionable tasks from the provided email text and return a JSON array matching the exact schema:

[
  {
    "taskDescription": "Specific action item description",
    "assignedOwner": "Person Name/Email or null",
    "deadline": "Explicit Date or null",
    "priority": "High" | "Medium" | "Low"
  }
]

STRICT NULLABILITY RULES:
1. Do NOT invent or fabricate deadlines. If no explicit deadline is stated in the email text, set "deadline": null.
2. If task ownership cannot be definitively determined, set "assignedOwner": null.
3. Priority MUST be one of "High", "Medium", or "Low".`;

    const validated = await AIService.completeStructured<ExtractedActionItem[]>(
      {
        systemPrompt,
        userPrompt: bodyContext,
        temperature: 0.1,
      },
      fallback,
      extractedActionItemsSchema
    );

    return validated.map((item) => ({
      ...item,
      sourceEmailId: item.sourceEmailId ?? sourceEmailId,
    }));
  }
}
