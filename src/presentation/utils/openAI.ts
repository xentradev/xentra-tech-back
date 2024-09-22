import OpenAI from "openai";
import logger from "./logger";
import { envs } from "../../config";
import { CustomError } from "../../domain";
import { MessageContentPartParam } from "openai/resources/beta/threads/messages";

const openai = new OpenAI({
  apiKey: envs.OPEN_AI_API_KEY,
});

export const createThread = async (): Promise<string> => {
  try {
    return (await openai.beta.threads.create()).id;
  } catch (e) {
    throw e;
  }
};

export const sendMessageToAssistantInAThread = async ({
  message,
  thread,
  from,
  assistantId,
}: {
  message: string;
  thread: string;
  from: "telegram" | "chat";
  assistantId: string
}) => {
  try {
    // Step 3: Add a Message to a Thread  https://platform.openai.com/docs/assistants/overview/step-3-add-a-message-to-a-thread
    await addMessageToThread({ message, thread });

    // Step 4: Run the Assistant https://platform.openai.com/docs/assistants/overview/step-4-run-the-assistant
    const run = await runAssistantInAThread({
      thread,
      assistantId
    });

    // Step 5: Check the Run status https://platform.openai.com/docs/assistants/overview/step-5-check-the-run-status
    await checkRunStatus({ run, thread });

    // Step 6: Step 6: Display the Assistant's Response
    const assistantResponse = await getAssistantThreadList({ thread });

    return assistantResponse;
  } catch (e) {
    logger.error(
      `ERROR OPEN AI - from=${from} error=${e} - message: ${message} - thread: ${thread}`
    );
    throw e;
  }
};

const addMessageToThread = async ({
  message,
  thread,
}: {
  thread: string;
  message: string;
}) => {
  let bodyContent: Array<MessageContentPartParam> = [{
    type: "text",
    text: message,
  }];
  return await openai.beta.threads.messages.create(thread, {
    role: "user",
    // @ts-ignore
    content: bodyContent,
    attachments: [],
    metadata: {},
  });
};

const runAssistantInAThread = async ({ thread, assistantId }: { thread: string, assistantId: string }) => {
  const run = await openai.beta.threads.runs.create(thread, {
    assistant_id: assistantId,
  });
  return run;
};

const checkRunStatus = async ({
  run,
  thread,
}: {
  run: { id: string };
  thread: string;
}) => {
  while (true) {
    const runInfo = await openai.beta.threads.runs.retrieve(thread, run.id);
    if (runInfo.status === "completed") {
      break;
    }
  }
};

const getAssistantThreadList = async ({ thread }: { thread: string }) => {
  const messages: OpenAI.Beta.Threads.Messages.MessagesPage =
    await openai.beta.threads.messages.list(thread);
  if (messages.data.length === 0) {
    throw CustomError.internalServerError("OPEN AI - empty messages");
  }
  const assistantResponse = messages.data[0];
  // @ts-ignore
  if (
    !assistantResponse.content ||
    assistantResponse.content.length === 0 ||
    // @ts-ignore
    !assistantResponse.content[0]?.text
  ) {
    throw CustomError.internalServerError(
      "OPEN AI - is not answering as expected"
    );
  }
  return {
    id: assistantResponse.id,
    // @ts-ignore
    text: assistantResponse.content[0]?.text?.value,
    role: assistantResponse.role,
  };
};
