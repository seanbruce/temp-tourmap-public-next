import { clsx } from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Section({ title, children, className }: SectionProps) {
  return (
    <section className={clsx(className)}>
      <p className="text-brand-green text-xl mb-4 flex items-center">
        <FontAwesomeIcon
          icon={faCaretRight}
          className="mr-2 w-[10px] h-[20px]"
        />
        {title}
      </p>
      <div className={clsx("px-16", "max-md:px-8", "max-sm:px-1")}>
        {children}
      </div>
    </section>
  );
}
