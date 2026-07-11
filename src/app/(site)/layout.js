import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import Whatsapp from "@/components/Whatsapp";

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <Whatsapp />
    </>
  );
}
