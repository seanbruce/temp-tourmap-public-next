"use client";

import clsx from "clsx";

import { headerNavItems, footerNavItems } from "../navigation-items";
import { useShowNavigationValue } from "./show-navigation-context";

const normalNavItems = [...headerNavItems];
const smallScreenNavItems = [
  ...[...normalNavItems].reverse(),
  ...footerNavItems,
];

export default function SmallScreenMenuDrop() {
  const showNav = useShowNavigationValue();
  return (
    <div
      className={clsx(
        "absolute",
        "top-full",
        "left-0",
        "right-0",
        "w-full",
        "bg-black/80",
        "transition-[height]",
        "flex",
        "flex-wrap",
        "content-start",
        "overflow-hidden",
        showNav ? "h-[400px]" : "h-0"
      )}
    >
      {smallScreenNavItems.map((item) => (
        <div
          key={item.title}
          className={clsx(
            "text-[#b8b8b8]",
            "text-[13px]",
            "p-[15px]",
            "w-1/2",
            "h-min"
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
