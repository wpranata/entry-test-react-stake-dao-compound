import { Context, useContext } from "react";

export function useCustomContext<T>(context: Context<T>) {
  const values = useContext(context);
  if (!values) {
    throw new Error("Invalid context position");
  }

  return values;
}
