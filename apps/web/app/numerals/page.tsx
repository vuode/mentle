"use client";

import { NumeralsConfiguration } from "../../components/numerals/numerals-configuration";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4 h-full">
        <NumeralsConfiguration
          onSelect={(token) => {
            const params = new URLSearchParams({ token });
            router.push(`/numerals/exercise?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
}
