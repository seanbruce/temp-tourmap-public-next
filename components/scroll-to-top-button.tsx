"use client";
import "client-only";
import { clsx } from "clsx";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScrollToTopButtonProps {
  target?: string;
}

export default function ScrollToTopButton({ target }: ScrollToTopButtonProps) {
  return (
    <div
      className={clsx(
        "fixed",
        "bottom-8",
        "right-12",
        "max-sm:bottom-14",
        "max-sm:right-2",
        "flex",
        "flex-col",
        "items-center",
        "z-10"
      )}
    >
      <button
        className="w-10 h-10 bg-black/70 flex justify-center items-center"
        onClick={() => {
          if (target) {
            const targetElement = document.getElementById(target);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }
        }}
      >
        <FontAwesomeIcon
          icon={faAngleUp}
          className="text-white w-[21px] h-[24px]"
        />
      </button>
    </div>
  );
}
