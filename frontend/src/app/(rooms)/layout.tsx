import Link from "next/link";

export default function RoomsLayout({children}: {children: React.ReactNode}) {
  return (
    <main>
      <nav className="text-xl py-2">
        <Link href={'/'}>Channels</Link>
        <Link href={'/chats'}>Chats</Link>
      </nav>
      {children}
    </main>
  )
}