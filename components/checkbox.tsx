"use client";

type CheckboxProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> & {
  label: React.ReactNode;
};

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" className="mr-2" {...props} />
      {label}
    </label>
  );
}

export { Checkbox };
