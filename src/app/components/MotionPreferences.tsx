import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

const MotionPreferencesContext = createContext({
  paused: false,
  reduced: false,
  disabled: false,
});

export function MotionPreferencesProvider({
  paused,
  children,
}: {
  paused: boolean;
  children: ReactNode;
}) {
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => true,
  );
  const preferences = useMemo(
    () => ({ paused, reduced, disabled: paused || reduced }),
    [paused, reduced],
  );

  return (
    <MotionPreferencesContext.Provider value={preferences}>
      {children}
    </MotionPreferencesContext.Provider>
  );
}

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}
