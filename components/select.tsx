import { clsx } from "clsx";
import { forwardRef } from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, className, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx("text-slate-900 py-1 px-2 h-8", className)}
      {...props}
    >
      {children}
    </select>
  );
});

type OptionProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

function Option({ children, className, ...props }: OptionProps) {
  return (
    <option className={clsx(className)} {...props}>
      {children}
    </option>
  );
}

export { Option };
