"use client";

import { Button } from "@mentle/ui/button";
import { ArrowRight } from "lucide-react";
import HeroIllustration from "~/assets/hero.svg";
import GithubIcon from "~/assets/github-mark.svg";
import { subjects } from "./subjects";
import { SubjectCard } from "./subject-card";
import Link from "next/link";

export const Landing: React.FC = () => {
  return (
    <div className="h-full min-h-[600px]">
      <div className="h-full flex flex-col">
        <header className="mx-auto py-4 px-4 w-full max-w-4xl">
          <h1 className="text-2xl font-bold">mentle</h1>
        </header>
        <div className="mx-auto my-6 px-4 w-full grow flex flex-col justify-center">
          <main className="relative mx-auto max-w-4xl h-[500px]  flex flex-col justify-center">
            <HeroIllustration className="absolute top-0 w-[300px] max-w-[90%]" />
            <div className="w-4/5 self-end z-10">
              <h2 className="my-4 text-4xl sm:text-6xl font-semibold">
                Platforma dla uczących się polskiego
              </h2>
              <h3 className="my-4 text-lg sm:text-xl">
                Zautomatyzowane ćwiczenia, skierowane na trudności, wywołane
                interferencją języka rosyjskiego
              </h3>
              <Button
                className="flex items-center"
                onClick={() => {
                  const subjects = document.querySelector("#subjects");
                  subjects?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Zacznij <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-full">
        <div className="grow bg-slate-100">
          <section id="subjects" className="mx-auto p-4 w-full max-w-4xl">
            <h3 className="my-10 text-2xl sm:text-4xl font-semibold text-center">
              Dostępne tematy
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map(({ id, title, path }) => (
                <li key={id}>
                  <SubjectCard id={id} title={title} path={path} />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="bg-white">
          <footer className="mx-auto p-4 w-full max-w-4xl flex justify-between items-center">
            <div className="text-gray-400">mentle &copy; 2024</div>
            <div>
              <Link href="https://github.com/vuode/mentle">
                <GithubIcon className="w-6 h-6 text-gray-400 hover:text-black" />
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
