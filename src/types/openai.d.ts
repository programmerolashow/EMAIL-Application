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

  export interface ChatCompletion {
    choices: ChatCompletionChoice[];
  }

  export interface ChatCompletionsCreateParams {
    model: string;
    messages: ChatCompletionMessageParam[];
    temperature?: number;
  }

  export default class OpenAI {
    constructor(config: { apiKey?: string });
    chat: {
      completions: {
        create(params: ChatCompletionsCreateParams): Promise<ChatCompletion>;
      };
    };
  }
}
