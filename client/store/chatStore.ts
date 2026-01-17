import { create } from 'zustand';

export type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

type ChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
