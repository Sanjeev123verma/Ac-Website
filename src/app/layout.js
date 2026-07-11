import Providers from "./providers";
import "../globals.css";

export const metadata = {
  title: {
    default: "Swan AC | Appliance Repair",
    template: "%s | Swan AC",
  },
  description:
    "Doorstep AC, fridge and washing machine repair service in Mira Bhayander and nearby Mumbai areas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
