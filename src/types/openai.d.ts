declare module "openai" {
  export interface ChatCompletionMessageParam {
    role: "system" | "user" | "assistant";
    content: string;
  }

  export interface ChatCompletionChoice {
    message?: {
      content?: string | null;
    };
  }

  export interface ChatCompletionUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  }

  export interface ChatCompletion {
    choices: ChatCompletionChoice[];
    usage?: ChatCompletionUsage;
  }

  export interface ChatCompletionsCreateParams {
    model: string;
    messages: ChatCompletionMessageParam[];
    temperature?: number;
    max_tokens?: number;
  }

  export default class OpenAI {
    constructor(config: { apiKey?: string });
    chat: {
      completions: {
        create(
          params: ChatCompletionsCreateParams,
          options?: { signal?: AbortSignal }
        ): Promise<ChatCompletion>;
      };
    };
  }
}
