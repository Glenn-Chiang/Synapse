import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Synapse',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
        {children}</body>
    </html>
  )
}

function Topbar() {
  return (
    <nav className='w-screen h-16 shadow p-4 fixed top-0 left-0 font-medium flex items-center'>
      <div className='flex gap-2 items-center'>
        <FontAwesomeIcon icon={faBars}/>
        Synapse
      </div>
    </nav>
  )
}
