import { LoadingContext } from "./Loading.provider";
import { useCustomContext } from "../context/useCustomContext";

export function Loading() {
  const { loadingMessage, loadingIsClear } = useCustomContext(LoadingContext);

  return (
    <>
      {!loadingIsClear && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            background: "rgba(0, 0, 0, 0.5)",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <div className="spinner-border text-primary" />
            <p className="mt-2">{loadingMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
