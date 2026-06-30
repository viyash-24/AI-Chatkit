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
