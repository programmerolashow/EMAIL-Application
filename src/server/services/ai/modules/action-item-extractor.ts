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

    const fallback: ExtractedActionItem[] = [
      {
        task: `Follow up on "${target.subject}"`,
        owner: "User",
        deadline: "As soon as possible",
        priority: "Medium",
        sourceEmailId,
      },
    ];

    const systemPrompt = `You are an executive task extraction engine. Extract all actionable tasks from the email text and return JSON matching this schema:
[
  {
    "task": "Specific task description",
    "owner": "Name of assigned person or User",
    "deadline": "Extracted date or TBD",
    "priority": "High" | "Medium" | "Low"
  }
]`;

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
