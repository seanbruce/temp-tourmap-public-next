import clsx from "clsx";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <>
      <main className="flex flex-col bg-black/50 p-10 max-md:p-5 max-sm:p-0.5 max-sm:pt-4 relative flex-auto">
        {children}
      </main>
      <div
        className={clsx(
          "h-[64px]",
          "bg-top",
          "bg-no-repeat",
          'bg-[url("/assets/background-bottom-shadow.png")]'
        )}
      />
    </>
  );
}
