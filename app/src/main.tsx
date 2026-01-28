import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import "./index.css";
import App from "./App.tsx";
import fetcher from "@/lib/fetcher.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        //refreshInterval: 3000,
        fetcher,
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>,
);
