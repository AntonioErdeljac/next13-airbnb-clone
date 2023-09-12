import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import NavBar from './components/navbar/NavBar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
// import ClientOnly from './components/ClientOnly'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'AirBnB Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/*Uncomment the ClientOnly wrapper around NavBar for Hydration error*/}
        {/* <ClientOnly> */}
        {/* <Modal title='Login Modal' isOpen /> */}
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <NavBar currentUser={currentUser} />
        {/* </ClientOnly> */}
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
