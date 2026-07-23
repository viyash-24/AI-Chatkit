import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageInput from "../components/MessageInput";
import { useLayoutContext } from '../../layout-context';
import { Message, ChatComponentProps } from '../types/chat.types';
import { useStreamChat } from '../hooks/useStreamChat';
import MessageBubble from '../components/MessageBubble';
import useChatActions from '../hooks/useChatActions';

const ChatComponent: React.FC<ChatComponentProps> = ({
  threadId,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const { agentId, setAgentId, currentThreadId, setCurrentThreadId } = useLayoutContext()

  useEffect(() => {
    if(threadId){
      setCurrentThreadId(threadId)
    }
  });
  
  console.log("chat agentId", agentId)
  console.log("chat threadId", currentThreadId)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if(messages.length > 0){
      localStorage.setItem(
        "chatMessages-" + currentThreadId,
        JSON.stringify(messages)
      );
    } 
  }, [messages]);


  const { handleNewChat } = useChatActions({ setMessages, setInput, isStreaming, setIsStreaming });

  useEffect(() => {
    console.log("currentThreadId", currentThreadId);
    if(!currentThreadId || currentThreadId === "") {
      handleNewChat();
      return;
    }
    const storedMessages = localStorage.getItem(
      "chatMessages-" + currentThreadId
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([]);
    }
  }, [currentThreadId]);

  const { handleStream } = useStreamChat({ currentThreadId, agentId, setMessages, isStreaming, setIsStreaming });

  const handleSend = async () => {
    setInput("");

    setIsStreaming(true);
    if (!currentThreadId) {
      setCurrentThreadId(uuidv4());
      window.dispatchEvent(
        new CustomEvent("add-session", {
          detail: { threadId: currentThreadId, msg: input },
        })
      );
    }
    await handleStream(input);
  };
