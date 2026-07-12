import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFab from './WhatsAppFab'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
