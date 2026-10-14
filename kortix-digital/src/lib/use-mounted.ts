"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and the hydration render, `true` once the component is
 * running on the client. Used to swap in browser-only UI without a
 * `setState` inside an effect (which causes a cascading re-render).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
