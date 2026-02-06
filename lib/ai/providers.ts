import { createGroq } from "@ai-sdk/groq";
import {
    customProvider,
    extractReasoningMiddleware,
    wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
          const {
                    artifactModel,
                    chatModel,
                    reasoningModel,
                    titleModel,
          } = require("./models.mock");
          return customProvider({
                    languageModels: {
                                "chat-model": chatModel,
                                "chat-model-reasoning": reasoningModel,
                                "title-model": titleModel,
                                "artifact-model": artifactModel,
                    },
          });
  })()
    : null;

export function getLanguageModel(modelId: string) {
    if (isTestEnvironment && myProvider) {
          return myProvider.languageModel(modelId);
    }

  return groq("llama-3.3-70b-versatile");
}

export function getTitleModel() {
    if (isTestEnvironment && myProvider) {
          return myProvider.languageModel("title-model");
    }
    return groq("llama-3.3-70b-versatile");
}

export function getArtifactModel() {
    if (isTestEnvironment && myProvider) {
          return myProvider.languageModel("artifact-model");
    }
    return groq("llama-3.3-70b-versatile");
}
