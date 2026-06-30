import { SetStateAction } from 'react';
import { Message } from '../types/chat.types';

interface UseChatActionsProps {
  setMessages: (value: SetStateAction<Message[]>) => void;
  setInput: (value: SetStateAction<string>) => void;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
}
