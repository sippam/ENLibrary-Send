import "@/styles/globals.css";
import "./components/style.css";
import { ThemeProvider } from "next-themes";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </ThemeProvider>
    </SessionContextProvider>
  );
}