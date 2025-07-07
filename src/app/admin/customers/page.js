import dynamic from "next/dynamic";

const CustomerPageClient = dynamic(() => import("./CustomerPageClient"), {
  ssr: false, // Disable server rendering
});

export default function Page() {
  return <CustomerPageClient />;
}