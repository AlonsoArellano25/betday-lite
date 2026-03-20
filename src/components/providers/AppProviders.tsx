"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { store } from "@/store";
import { hydrateBets } from "@/store/slices/betsSlice";

const STORAGE_KEY = "betday-lite-bets";

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      store.dispatch(hydrateBets([]));
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      store.dispatch(hydrateBets(parsed));
    } catch {
      store.dispatch(hydrateBets([]));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.bets.hydrated) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(state.bets.simulatedBets)
        );
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
        <Toaster richColors position="top-right" />
      </Provider>
    </SessionProvider>
  );
}
