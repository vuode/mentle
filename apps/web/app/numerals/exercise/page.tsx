import { NextPage } from "next";
import { NumeralsExercisePageContent } from "./content";
import { Suspense } from "react";

const NumeralsExercisePage: NextPage = () => {
  return (
    <Suspense>
      <NumeralsExercisePageContent />
    </Suspense>
  );
};

export default NumeralsExercisePage;
