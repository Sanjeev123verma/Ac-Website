import dynamic from "next/dynamic";

const CustomerPageClient = dynamic(() => import("./CustomerPageClient"));

export default function Page() {
  return <CustomerPageClient />;
}
