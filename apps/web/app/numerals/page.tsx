"use client";

import { useState } from "react";
import { NumeralsConfiguration } from "../../components/numerals/numerals-configuration";
import { Config } from "../../data/numeral-categories";
import { NumeralsExercise } from "../../components/numerals/numerals-exercise";

export default function Page() {
  const [config, setConfig] = useState<Config[] | null>(null);
  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4 h-full">
        {config ? (
          <NumeralsExercise config={config} onFinish={() => setConfig(null)} />
        ) : (
          <NumeralsConfiguration onSelect={setConfig} />
        )}
      </div>
    </div>
  );
}
