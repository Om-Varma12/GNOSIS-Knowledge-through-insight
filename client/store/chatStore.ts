import { create } from 'zustand';

export type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  data?: any;
  loading?: boolean;
};

type ChatState = {
  messages: Message[];
  selectedEvidence: any | null;
  addMessage: (message: Message) => void;
  replaceMessage: (id: string, message: Message) => void;
  setSelectedEvidence: (data: any) => void;
};


export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedEvidence: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  replaceMessage: (id, message) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? message : m
      ),
    })),

  setSelectedEvidence: (data) =>
    set(() => ({
      selectedEvidence: data,
    })),
}));
