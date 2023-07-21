import clsx from "clsx";
import Link from "next/link";

import { headerNavItems, footerNavItems } from "./navigation-items";
import ShowNavigationProvider from "./_header/show-navigation-context";
import { ToggleButton } from "./_header/toggle-button";
import SmallScreenMenuDrop from "./_header/small-screen-menu-drop";

const normalNavItems = [...headerNavItems];

export default function Header() {
  return (
    <ShowNavigationProvider>
      <header>
        <div
          className={clsx(
            "relative",
            "h-[86px]",
            "flex",
            "flex-nowrap",
            "max-[980px]:bg-black/80",
            "max-[980px]:h-[60px]",
            "max-[980px]:fixed",
            "max-[980px]:left-0",
            "max-[980px]:right-0",
            "max-[980px]:top-0",
            "max-[980px]:z-20",
            "max-[980px]:backdrop-blur"
          )}
        >
          <div>
            <Link
              href="/"
              className={clsx(
                "block",
                "w-[183px]",
                "h-[62px]",
                "mt-2",
                "bg-contain",
                "max-[980px]:w-[147px]",
                "max-[980px]:h-[50px]",
                "max-[980px]:mt-1.5",
                "max-[980px]:ml-2.5",
                'bg-[url("/assets/menu-logo.png")]'
              )}
            ></Link>
          </div>
          <div className={clsx("grow", "max-[980px]:hidden")}>
            <div className="flex flex-nowrap justify-end pr-8">
              <div className="flex flex-nowrap items-center gap-2">
                <span className="text-xs text-[#9ca3af]">language:</span>
                <select className="bg-stone-800 text-[#999999] p-[5px] text-[11px]">
                  <option>繁體中文</option>
                  <option>English</option>
                </select>
              </div>
            </div>
            <nav className="mt-2">
              <ul className="flex flex-nowrap justify-end">
                {normalNavItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.to}
                      className={clsx([
                        "border-b-2",
                        " font-extrabold",
                        "text-[15px]",
                        "py-1",
                        "px-6",
                        "transition-colors",
                        "hover:text-white",
                        item.title === "線上訂房"
                          ? "border-[#a2e646]"
                          : "border-[#4b4b4b]",
                        item.title === "線上訂房"
                          ? "text-[#a2e646]"
                          : "text-[#b8b8b8]",
                      ])}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div
            className={clsx(
              "hidden",
              "w-full",
              "pr-4",
              "justify-end",
              "items-center",
              "max-[980px]:flex"
            )}
          >
            <ToggleButton />
          </div>
          <SmallScreenMenuDrop />
        </div>
      </header>
    </ShowNavigationProvider>
  );
}
