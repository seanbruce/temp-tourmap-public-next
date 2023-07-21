"use client";

import { clsx } from "clsx";
import {
  useShowNavigationSetValue,
  useShowNavigationValue,
} from "./show-navigation-context";

function ToggleButton() {
  const showNavigation = useShowNavigationValue();
  const setShowNavigation = useShowNavigationSetValue();
  return (
    <button
      className={clsx(
        "text-white",
        "w-[36px]",
        "h-[36px]",
        "rounded-full",
        "transition-colors",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        showNavigation && "bg-slate-900"
      )}
      onClick={() => setShowNavigation((prev) => !prev)}
    >
      <div className="w-[24px] h-[16px] flex flex-col justify-between">
        <span
          className={clsx(
            "w-full",
            "h-[2px]",
            "bg-white",
            "transition-transform",
            showNavigation && "rotate-45",
            showNavigation && "translate-y-[7px]"
          )}
        ></span>
        <span
          className={clsx(
            "w-full",
            "h-[2px]",
            "bg-white",
            "transition-opacity",
            showNavigation && "opacity-0"
          )}
        ></span>
        <span
          className={clsx(
            "w-full",
            "h-[2px]",
            "bg-white",
            "transition-transform	",
            showNavigation && "-rotate-45",
            showNavigation && "-translate-y-[7px]"
          )}
        ></span>
      </div>
    </button>
  );
}

export { ToggleButton };
