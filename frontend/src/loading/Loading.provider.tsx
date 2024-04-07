import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Loading } from "./Loading";

type LoadingContextType = {
  loadingMessage: string;
  loadingIsClear: boolean;
  setLoadingMessage: (message: string) => void;
  clearLoadingMessage: () => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export function LoadingProvider(props: PropsWithChildren) {
  const [loadingMessage, setLoadingMessage] = useState("");

  const loadingIsClear = useMemo(() => loadingMessage === "", [loadingMessage]);

  const clearLoadingMessage = useCallback(() => {
    setLoadingMessage("");
  }, [setLoadingMessage]);

  const values = useMemo(
    () => ({
      loadingMessage,
      loadingIsClear,
      setLoadingMessage,
      clearLoadingMessage,
    }),
    [loadingMessage, loadingIsClear, setLoadingMessage, clearLoadingMessage]
  );

  return (
    <LoadingContext.Provider value={values}>
      <Loading />
      {props.children}
    </LoadingContext.Provider>
  );
}
