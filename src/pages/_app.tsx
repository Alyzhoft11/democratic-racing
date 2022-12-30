import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Container from "../components/ui/Container";
import Sidebar from "../components/ui/Sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex">
        <Sidebar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
