import { type AppType } from "next/app";
import "@/styles/globals.css";

const MyApp: AppType<{ session: AppType | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <Component {...pageProps} />

    );
};

export default MyApp;
