import { message } from "antd";
import { Message } from "../types/chat.types";

interface UseStreamChatProps {
  currentThreadId: string;
  agentId: string;
  setMessages: (messages: Message[]) => void;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
}


export const useStreamChat = ({
  currentThreadId,
  agentId,
  setMessages,
  isStreaming,
  setIsStreaming,
}: UseStreamChatProps) => {
  const handleStream = async (input: string) => {
    if (!input.trim() || isStreaming) return;
    setIsStreaming(true);

    const newUserMessage: Message = {
      id: `user_${Date.now()}`,
      type: "user",
      content: input,
    };
    const newAiMessage: Message = {
      id: `ai_${Date.now()}`,
      type: "ai",
      content: "",
    };
    setMessages((prev: Message[]) => [...prev, newUserMessage, newAiMessage]);

    try {
      const requestMsg = {
        thread_id: currentThreadId,
        role: "user",
        message: input,
        agent_id: agentId,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestMsg),
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const dataChunk = decoder.decode(value, { stream: true });
