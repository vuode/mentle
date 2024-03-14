"use client";

import { useSearchParams } from "next/navigation";
import { getTokenData } from "./getTokenData";
import { NumeralsExercise } from "../../../components/numerals/numerals-exercise-2";

export const NumeralsExercisePageContent: React.FC = () => {
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
          onFinish={() => {}}
        />
      </div>
    </div>
  );
};
