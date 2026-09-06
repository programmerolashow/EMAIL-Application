import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import { EmailService } from "@/server/services/email-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import type { ExtractedActionItem } from "./types";

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
    const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
    return this.extract(target, openai);
  }

  public static async extract(
    target: NormalizedMessage | EmailThread,
    openai: OpenAI | null
  ): Promise<ExtractedActionItem[]> {
    const isThread = "messages" in target;
    const sourceEmailId = target.id;
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target)
      : `SUBJECT: ${target.subject}\nFROM: ${target.from.name ?? target.from.address}\nDATE: ${target.receivedAt}\n\n${AIContextBuilder.sanitizeText(target.body, 1200)}`;

    if (!openai) {
      return [
        {
          task: `Follow up on "${target.subject}"`,
          owner: "User",
          deadline: "As soon as possible",
          priority: "Medium",
          sourceEmailId,
        },
      ];
    }

    const systemPrompt = `You are an executive task extraction engine. Extract all actionable tasks from the email text and return JSON matching this schema:
[
  {
    "task": "Specific task description",
    "owner": "Name of assigned person or User",
    "deadline": "Extracted date or TBD",
    "priority": "High" | "Medium" | "Low"
  }
]`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: bodyContext },
        ],
        temperature: 0.1,
      });

      const text = response.choices[0]?.message?.content ?? "";
      const jsonStart = text.indexOf("[");
      const jsonEnd = text.lastIndexOf("]");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Partial<ExtractedActionItem>[];
        return parsed.map((item) => {
          const priorityStr = typeof item.priority === "string" ? item.priority : "Medium";
          const priority: "High" | "Medium" | "Low" =
            priorityStr === "High" || priorityStr === "Low" ? priorityStr : "Medium";

          return {
            task: item.task ?? "Unspecified task",
            owner: item.owner ?? "User",
            deadline: item.deadline ?? "TBD",
            priority,
            sourceEmailId,
          };
        });
      }
    } catch (err) {
      console.error("ActionItemExtractor GPT error:", err);
    }

    return [
      {
        task: `Review "${target.subject}"`,
        owner: "User",
        deadline: "TBD",
        priority: "Medium",
        sourceEmailId,
      },
    ];
  }
}
