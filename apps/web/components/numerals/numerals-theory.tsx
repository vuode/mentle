import { mp, nmp } from "../../data/numerals-text";
import { HelpTable } from "./help-table";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@repo/ui/accordion";

export const NumeralsTheory: React.FC = () => {
  return (
    <div>
      <h1 className="my-6 text-xl font-bold">
        Podmiot wyrażony frazą liczebnikową
      </h1>

      <Accordion type="multiple">
        <AccordionItem value="theory">
          <AccordionTrigger>Teoria</AccordionTrigger>
          <AccordionContent>
            <p className="my-4">
              W tej części skupimy się na zdaniach, w których podmiotem jest
              grupa liczebnikowa. To znaczy n.p. zdania typu [
              <span className="text-gray-400">ile?</span> siedem{" "}
              <span className="text-gray-400">kto/co?</span> jabłek{" "}
              <span className="text-gray-400">co (z)robili/(z)robiły?</span>{" "}
              spadło z drzewa]
            </p>

            <h3 className="my-4 font-semibold">Inne przykłady takich zdań:</h3>
            <ul className="pl-4 my-4 list-disc">
              <li>Pięć osób czeka w kolejce.</li>
              <li>Trzynaście jabłek leżało na stole.</li>
              <li>Dwadzieścia cztery koty będą pić wodę.</li>
              <li>Trzech braci przyjechało na wakacje.</li>
            </ul>

            <p className="my-4">
              W takich zdaniach odmiana liczebników, rzeczowników i czasowników
              zależy od grupy, do której należy liczba oraz rodzaju rzeczownika.
            </p>

            <p className="my-4">
              Dla tego tematy weźmiemy całe liczby większe od 1 i podzielimy je
              na dwie grupy:
            </p>
            <ul className="pl-4 my-4 list-disc">
              <li>
                <span className="font-semibold">2-4:</span> 2, 3, 4 oraz liczby,
                które kończą się na 2, 3, 4 oprócz 12, 13, 14
              </li>
              <li>
                <span className="font-semibold">5+:</span> 5-19 oraz liczby,
                które kończą się na 0, 1, 5, 6, 7, 8, 9
              </li>
            </ul>

            <p className="my-4">
              Oprócz grupy, do której należy liczba, jest dla nas istotny rodzaj
              rzeczownika, z którym tę liczbę chcemy połączyć:
            </p>

            <HelpTable data={nmp} />
            <HelpTable data={mp} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="russian-problems">
          <AccordionTrigger>Trudności dla rosyjskojęzycznych</AccordionTrigger>
          <AccordionContent>
            <h3 className="my-4 font-semibold">1. Męskoosobowość:</h3>

            <p className="my-4">
              Ćwiczenia polega na budowaniu zdań w czasie przeszłym z podanej
              liczby, rzeczownika i czasownika
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Rosyjski:</span> W języku
              rosyjskim nie ma kategorii męskoosobowości/niemęskoosobowości,
              która wpływałaby na formy liczebników w połączeniach z
              rzeczownikami. Na przykład, można powiedzieć zarówno "пять
              студентов" (pięć studentów), jak i "пять студенток" (pięć
              studentek).
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Polski:</span> W języku
              polskim forma liczebnika i rzeczownika musi zgadzać się pod
              względem rodzaju. Na przykład, poprawnie mówimy "pięciu studentów"
              (męskoosobowa) lub "pięć studentek" (niemęskoosobowa).
            </p>

            <h3 className="my-4 font-semibold">
              2. Odmiana złożonych liczebników, kończących się na "jeden":
            </h3>

            <p className="my-4">
              <span className="italic font-semibold">Rosyjski:</span> W
              liczebnikach złożonych "jeden" odmienia się przez rodzaje i
              przypadki. Na przykład, dopełniacz liczby 41 brzmi jak "сорока
              одного" (czterdziestu jednego).
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Polski:</span> W
              liczebnikach złożonych "jeden" zawsze pozostaje w tej samej
              formie, niezależnie od rodzaju rzeczownika albo przypadka.
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Przykład:</span> 1) Po
              polsku mówimy "Nie ma dwudziestu{" "}
              <span className="underline">jeden</span> uczniów", a po rosyjsku
              "Нет двадцати одного ученика" (Nie ma dwudziestu{" "}
              <span className="underline">jednego</span> ucznia).
              <br /> 2) Po polsku forma "jeden" pozostaje niezależnie od rodzaju
              rzeczownika: "Dałem to trzydziestu{" "}
              <span className="underline">jeden</span> uczennicom", w języku
              rosyjskim "jeden" odmienia się przez rodzaje i przypadki: "Я дал
              это тридцати одной ученице" (Dałem to trzydziestu{" "}
              <span className="underline">jednej</span> uczennicy).
            </p>

            <h3 className="my-4 font-semibold">
              3. Dobór rzeczowników do złożonych liczebników, kończących się na
              "jeden":
            </h3>

            <p className="my-4">
              <span className="italic font-semibold">Rosyjski:</span> Liczebniki
              złożone, kończące się na "jeden" łączą się z rzeczownikiem w
              mianowniku, w liczbie pojedynczej.
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Polski:</span> Liczebniki
              złożone, kończące się na "jeden" łączą się z rzeczownikiem w
              dopełniaczu, w liczbie mnogiej.
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Przykład:</span> Po polsku
              powiemy "Pięćdziesiąt jeden ołówków", kiedy po rosyjsku "Пятьдесят
              один карандаш" (Pięćdziesiąt jeden ołówek).
            </p>

            <h3 className="my-4 font-semibold">
              4. Dobór formy rzeczownika do liczebnika, kończącego się na 2, 3,
              4:
            </h3>

            <p className="my-4">
              <span className="italic font-semibold">Rosyjski:</span>{" "}
              Rzeczowniki łączą się z takimi liczebnikami w formie dopełniacza
              liczby pojedynczej.
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Polski:</span> Rzeczowniki
              zawsze są w formie mianownika liczby mnogiej w połączeniu z takimi
              liczebnikami.
            </p>

            <p className="my-4">
              <span className="italic font-semibold">Przykład:</span> Po
              rosyjsku można powiedzieć "тридцать три банана" (trzydzieści trzy
              banana), kiedy po polsku poprawnie będzie "trzydzieści trzy
              banany"
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exercises">
          <AccordionTrigger>Opis ćwiczeń</AccordionTrigger>
          <AccordionContent>
            <p className="my-4">
              Ćwiczenia polegają na budowaniu zdań w czasie przeszłym z podanej
              liczby, rzeczownika i czasownika. Ćwiczenia są podzielone na 4
              grupy:
            </p>

            <h3 className="my-4 font-semibold">21, 31, 41, ...</h3>

            <p className="my-4">
              To grupa ćwiczeń z liczebnikami złożonymi, kończącymi się na
              "jeden". Przeznaczona dla pomocy w przezwyciężeniu trudności{" "}
              <span className="font-semibold">#2</span> i{" "}
              <span className="font-semibold">#3</span> osób rosyjskojęzycznych.
            </p>

            <h3 className="my-4 font-semibold">
              2, 3, 4, 22, 23, 24, 32, 33, 34, ...
            </h3>

            <p className="my-4">
              To grupa ćwiczeń z liczebnikami, kończącymi się na 2, 3, 4 (2-4 w
              kartce teoria). Grupa skierowana na trudność{" "}
              <span className="font-semibold">#4</span> osób rosyjskojęzycznych.
            </p>

            <h3 className="my-4 font-semibold">Męskoosobowe</h3>

            <p className="my-4">
              To grupa ćwiczeń z liczebnikami w połączeniu z rzeczownikami
              rodzaju męskoosobowego. Grupa pomaga w trudności{" "}
              <span className="font-semibold">#1</span> osób rosyjskojęzycznych.
            </p>

            <h3 className="my-4 font-semibold">Pozostałe</h3>

            <p className="my-4">
              To grupa ćwiczeń z liczebnikami, które zwykłe nie powodują
              trudności u osób rosyjskojęzycznych (5+ w kartce teoria).
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
