import "@/styles/main.scss"
import Header from "@/pages/layout/header/header"
import { Outlet } from "react-router-dom"
import ButtonContact from "./components/client/contact/buttonContact"
import Footer from "./pages/layout/footer/footer"

const LayoutClient = () => {

  return (
    <>
      <Header />
      <Outlet />
      <ButtonContact />
      <Footer />
    </>
  )
}

export default LayoutClient
