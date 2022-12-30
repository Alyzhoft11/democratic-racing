import { useSession, signIn } from "next-auth/react";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("../components/Home"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function Home() {
  const session = useSession();

  if (session.status === "authenticated") {
    return <Main />;
  } else {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  return <Main />;
}

export default Home;
