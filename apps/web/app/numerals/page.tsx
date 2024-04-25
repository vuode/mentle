"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { NumeralsConfiguration } from "../../components/numerals/numerals-configuration";
import { useRouter } from "next/navigation";
import { NumeralsConfigurationSimple } from "../../components/numerals/numerals-configuration-simple";
import { NumeralsTheory } from "../../components/numerals/numerals-theory";

export default function Page() {
  const router = useRouter();

  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4">
        <NumeralsTheory />
      </div>
      <div className="p-4">
        <Tabs className="flex flex-col gap-2" defaultValue="simple">
          <TabsList className="w-full flex gap-1">
            <TabsTrigger className="grow" value="simple">
              Uproszczony
            </TabsTrigger>
            <TabsTrigger className="grow" value="advanced">
              Zaawansowany
            </TabsTrigger>
          </TabsList>

          <div className="p-4 border border-gray-200 shadow rounded-xl">
            <TabsContent value="simple">
              <NumeralsConfigurationSimple
                onSelect={(token) => {
                  const params = new URLSearchParams({ token });
                  router.push(`/numerals/exercise?${params.toString()}`);
                }}
              />
            </TabsContent>
            <TabsContent value="advanced">
              <NumeralsConfiguration
                onSelect={(token) => {
                  const params = new URLSearchParams({ token });
                  router.push(`/numerals/exercise?${params.toString()}`);
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
