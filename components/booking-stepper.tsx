import { Fragment } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const STEPS = [
  {
    title: "查詢營位",
  },
  {
    title: "選擇營位",
  },
  {
    title: "選擇服務",
  },
  {
    title: "填寫資料",
  },
  {
    title: "完成訂單",
  },
];

interface StepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: StepperProps) {
  return (
    <div
      className={clsx(
        "h-[120px]",
        "flex",
        "justify-center",
        "items-center",
        "gap-5",
        "mb-5",
        "max-md:gap-2",
        "max-sm:gap-1"
      )}
    >
      {STEPS.map(({ title }, index) => (
        <Fragment key={title}>
          <div
            className={clsx(
              "flex",
              "flex-col",
              "justify-center",
              "items-center",
              "w-[120px]",
              "h-[120px]",
              "shrink-0",
              "border-2",
              "rounded-full",
              "border-brand-gold",
              "max-[980px]:w-[100px]",
              "max-[980px]:h-[100px]",
              "max-[800px]:w-[90px]",
              "max-[800px]:h-[90px]",
              "max-[730px]:w-[70px]",
              "max-[730px]:h-[70px]",
              "max-[660px]:w-[60px]",
              "max-[660px]:h-[60px]",
              "max-sm:w-[56px]",
              "max-sm:h-[56px]",
              currentStep === index ? "text-black" : "text-brand-gold",
              currentStep === index ? "bg-brand-gold" : "bg-transparent"
            )}
          >
            <div
              className={clsx(
                "flex",
                "flex-col",
                "items-center",
                "-mt-2.5",
                "max-[730px]:-mt-0"
              )}
            >
              <p
                className={clsx(
                  "text-[15px]",
                  "leading-[25px]",
                  "max-[730px]:text-[10px]",
                  "max-[730px]:leading-[15px]"
                )}
              >
                STEP
                <span
                  className={clsx(
                    "text-[25px]",
                    "ml-1",
                    "max-[730px]:text-[15px]"
                  )}
                >
                  {index + 1}
                </span>
              </p>
              <p
                className={clsx(
                  "text-[18px]",
                  "leading-[18px]",
                  "max-[730px]:text-[13px]",
                  "max-sm:text-[10px]"
                )}
              >
                {title}
              </p>
            </div>
          </div>
          {index !== STEPS.length - 1 && (
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-brand-gold w-4 h-4"
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
