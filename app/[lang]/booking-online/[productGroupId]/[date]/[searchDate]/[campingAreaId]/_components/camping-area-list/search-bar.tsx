"use client";

import "client-only";
import { useCallback, useRef } from "react";
import Input from "@/components/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { searchParamNames } from "@/utils/constants";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const timeoutRef = useRef<number | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <Input
      className="ml-auto max-sm:ml-0 max-sm:mt-2"
      placeholder="搜索營區名稱"
      onChange={(event) => {
        const value = event.currentTarget.value;
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          const queryString = createQueryString(
            searchParamNames.campingName,
            value
          );
          router.push(`${pathname}?${queryString}`, { scroll: false });
        }, 200);
      }}
    />
  );
}
