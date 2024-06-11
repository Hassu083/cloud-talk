import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { nanoid } from "@/lib/utils";
import { getMissingKeys } from "./actions";
import { Providers } from "@/components/providers";

export const metadata = {
  title: 'Cloudbot'
}


export default async function Home() {
  const id = nanoid()
  // const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Header />
        <Chat id={id} missingKeys={missingKeys} />
      </main>
    </Providers>

  );
}
