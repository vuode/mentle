"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getTokenData } from "./getTokenData";
import { NumeralsExercise } from "../../../components/numerals/numerals-exercise";

export const NumeralsExercisePageContent: React.FC = () => {
  const router = useRouter();

  const params = useSearchParams();
  const rawToken = params.get("token");
  const data = getTokenData(rawToken);

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4 h-full">
        <NumeralsExercise
          token={data.token}
          tasks={data.tasks}
          onFinish={() => {
            router.push("/numerals");
          }}
        />
      </div>
    </div>
  );
};
