"use client";

import { Button } from "@repo/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroCircles from "~/assets/hero-circles.svg";

export const Landing: React.FC = () => {
  return (
    <div className="h-full min-h-[600px]">
      <div className="h-full flex flex-col">
        <header className="mx-auto py-4 px-4 w-full max-w-4xl">
          <h1 className="text-2xl font-bold">mentle</h1>
        </header>
        <div className="mx-auto my-6 px-4 w-full grow flex flex-col justify-center">
          <main className="relative mx-auto max-w-4xl h-[500px]  flex flex-col justify-center">
            <Image
              className="absolute top-0 max-w-[90%]"
              src={heroCircles}
              alt="circles"
            />
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
      <div className="w-full min-h-full bg-slate-100">
        <section id="subjects" className="mx-auto p-4 max-w-4xl">
          <h3 className="my-10 text-2xl sm:text-4xl font-semibold text-center">
            Dostępne tematy
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <li className="">
              <Link href="/numerals">
                <div className="p-4 shadow rounded-md bg-white">
                  <div className="flex justify-center items-center p-1 bg-willow-400 rounded-md text-white font-mono font-semibold w-10 h-10">
                    01
                  </div>
                  <h4 className="my-2 text-lg font-semibold">
                    Podmiot wyrażony frazą liczebnikową
                  </h4>
                  <div className="flex justify-end">
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
