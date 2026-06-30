import { message } from "antd";
import { Message } from "../types/chat.types";

interface UseStreamChatProps {
  currentThreadId: string;
  agentId: string;
  setMessages: (messages: Message[]) => void;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
}

