import { useEffect, useRef, useState } from "react";
import { StoreApi } from "zustand";

export function useSelectiveUpdate<T, U>(
  store: StoreApi<T>,
  selector: (state: T) => U
) {
  const ref = useRef(selector(store.getState()));
  const [state, setState] = useState(ref.current);

  useEffect(() => {
    return store.subscribe((newState) => {
      const nextValue = selector(newState);
      if (ref.current !== nextValue) {
        ref.current = nextValue;
        setState(nextValue);
      }
    });
  }, [selector, store]);

  return state;
}
