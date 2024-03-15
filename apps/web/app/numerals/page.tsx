"use client";

import { useState } from "react";
import { NumeralsConfiguration } from "../../components/numerals/numerals-configuration-2";
import { Config } from "../../data/numeral-categories";
import { NumeralsExercise } from "../../components/numerals/numerals-exercise";
import { useRouter } from "next/navigation";

export default function Page() {
  const [config, setConfig] = useState<Config[] | null>(null);
  const router = useRouter();
  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4 h-full">
        {config ? (
          <NumeralsExercise config={config} onFinish={() => setConfig(null)} />
        ) : (
          <NumeralsConfiguration
            onSelect={(token) => {
              const params = new URLSearchParams({ token });
              router.push(`/numerals/exercise?${params.toString()}`);
            }}
          />
        )}
      </div>
    </div>
  );
}
