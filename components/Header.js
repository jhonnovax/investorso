"use client";

import { useState, useEffect } from "react";
/* import { useSearchParams } from "next/navigation"; */
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import logo from "@/app/icon.png";
import config from "@/config";

const links = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#testimonials",
    label: "Reviews",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const cta = <ButtonSignin extraStyle="btn-primary" />;

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = ({ 
  links = [], 
  cta = null, 
  isOpen,
  setIsOpen,
  mobileContent = null
}) => {
 /*  const searchParams = useSearchParams(); */

  // setIsOpen(false) when the route changes
 /*  useEffect(() => {
    setIsOpen(false);
  }, [searchParams, setIsOpen]); */

  return (
    <header className="bg-base-100 shadow-sm">
      <nav className="container flex items-center justify-between px-8 py-4 mx-auto">
        {/* Logo area */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title={`${config.appName} hompage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
        </div>

        {/* Burger button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setIsOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Links on large screens */}
        {links.length > 0 && (
          <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="link link-hover"
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* CTA on large screens */}
        {cta && (
          <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
        )}
      </nav>

      {/* Mobile drawer */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Calculator Parameters</h2>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Custom mobile content */}
          {mobileContent}
        </div>
      </div>
    </header>
  );
};

export default Header;
