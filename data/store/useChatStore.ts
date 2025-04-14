"use client";
import { create } from "zustand";

type SetOpen = (value: boolean | ((prev: boolean) => boolean)) => void;

type ChatStore = {
  open: boolean;
  setOpen: SetOpen;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  open: false,
  setOpen: (value) => {
    const newValue = typeof value === 'function'
      ? (value as (prev: boolean) => boolean)(get().open)
      : value;

    set({ open: newValue });
  },
}));
