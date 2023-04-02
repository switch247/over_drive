import { type AppType } from "next/app";
import "@/styles/globals.css";
const MyApp: AppType<{ session: any | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-bgc">

      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
