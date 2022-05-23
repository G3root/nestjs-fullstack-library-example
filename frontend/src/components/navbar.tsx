import Link from "next/link";
import * as React from "react";

export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <nav className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200">
        <div className="h-16 flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="font-bold text-lg">Library portal</a>
            </Link>
          </div>
          <div>
            <button>sign-in</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
