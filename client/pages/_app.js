import "@/styles/globals.css";
import "./components/style.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    // <ThemeProvider enableSystem={true} attribute="class">
    <>
      <Component />
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
    </>
    // </ThemeProvider>
  );
}
