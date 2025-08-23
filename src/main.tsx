import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// if (import.meta.env.MODE === "development") {
//   const { worker } = await import("./mocks/browser");
//   await worker.start({
//     serviceWorker: {
//       url: "/mockServiceWorker.js",
//     },
//     onUnhandledRequest: "bypass",
//   });
// }

createRoot(document.getElementById("root")!).render(<App />);

window.addEventListener("error", (e) => {
  console.error("[window.error]", e.error || e.message, e);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("[unhandledrejection]", e.reason || e);
});
