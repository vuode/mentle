import { mp, nmp } from "../../data/numerals-text";
import { HelpTable } from "./help-table";

export const NumeralsTheory: React.FC = () => {
  return (
    <div>
      <h1 className="my-6 text-xl font-bold">
        Podmiot wyrażony frazą liczebnikową
      </h1>
      <p className="my-4">
        W tej części skupimy się na zdaniach, w których podmiotem jest grupa
        liczebnikowa. To znaczy n.p. zdania typu [
        <span className="text-gray-400">ile?</span> siedem{" "}
        <span className="text-gray-400">kto/co?</span> jabłek{" "}
        <span className="text-gray-400">co (z)robili/(z)robiły?</span> spadło z
        drzewa]
      </p>

      <h3 className="my-4 font-semibold">Inne przykłady takich zdań:</h3>
      <ul className="pl-4 my-4 list-disc">
        <li>Pięć osób czeka w kolejce.</li>
        <li>Trzynaście jabłek leżało na stole.</li>
        <li>Dwadzieścia cztery koty będą pić wodę.</li>
        <li>Trzech braci przyjechało na wakacje.</li>
      </ul>

      <p className="my-4">
        W takich zdaniach odmiana liczebników, rzeczowników i czasowników zależy
        od grupy, do której należy liczba oraz rodzaju rzeczownika.
      </p>

      <p className="my-4">
        Dla tego tematy weźmiemy całe liczby większe od 1 i podzielimy je na
        dwie grupy:
      </p>
      <ul className="pl-4 my-4 list-disc">
        <li>
          <span className="font-semibold">2-4:</span> 2, 3, 4 oraz liczby, które
          kończą się na 2, 3, 4 oprócz 12, 13, 14
        </li>
        <li>
          <span className="font-semibold">5+:</span> 5-19 oraz liczby, które
          kończą się na 0, 1, 5, 6, 7, 8, 9
        </li>
      </ul>

      <p className="my-4">
        Oprócz grupy, do której należy liczba, jest dla nas istotny rodzaj
        rzeczownika, z którym tę liczbę chcemy połączyć:
      </p>

      <HelpTable data={nmp} />
      <HelpTable data={mp} />
    </div>
  );
};
