import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mx-auto text-center">
          <Link
            href="/#"
            aria-current="page"
            className="flex gap-2 justify-center items-center"
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              priority={true}
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <strong className="font-extrabold tracking-tight text-base md:text-lg">
              {config.appName}
            </strong>
          </Link>

          <p className="mt-3 text-sm text-base-content/80">
            {config.appDescription}
          </p>

          <p className="mt-3 flex flex-col gap-2 md:gap-4 md:flex-row justify-center items-center text-sm text-base-content/80">
            <Link href="/tos" className="link link-hover">
              ❤️ Support Us
            </Link>
            <Link href="/privacy-policy" className="link link-hover">
              🔒 Privacy policy
            </Link>
            <Link href="/tos" className="link link-hover">
              📜 Terms of services
            </Link>
          </p>

          <p className="mt-3 text-sm text-base-content/80">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>

        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
