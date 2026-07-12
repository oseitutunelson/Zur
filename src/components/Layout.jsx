import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import WhatsAppFab from './WhatsAppFab'

export default function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
