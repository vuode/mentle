"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { NumeralsConfiguration } from "../../components/numerals/numerals-configuration";
import { useRouter } from "next/navigation";
import { NumeralsConfigurationSimple } from "../../components/numerals/numerals-configuration-simple";

export default function Page() {
  const router = useRouter();

  return (
    <div className="mx-auto h-full max-w-screen-sm">
      <div className="p-4 h-full">
        <Tabs defaultValue="simple">
          <TabsList className="w-full flex gap-1">
            <TabsTrigger className="grow" value="simple">
              Uproszczony
            </TabsTrigger>
            <TabsTrigger className="grow" value="advanced">
              Zaawansowany
            </TabsTrigger>
          </TabsList>
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
        </Tabs>
      </div>
    </div>
  );
}
