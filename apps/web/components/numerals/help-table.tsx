import { cn } from "@mentle/ui/utils";
import { Fragment } from "react";

interface HelpTableCellText {
  type: "regular" | "gray";
  data: string[];
}

interface HelpTableRow {
  title: string;
  data: HelpTableCellText[][];
}

export interface HelpTableData {
  title: string;
  headings: string[];
  rows: HelpTableRow[];
}

interface HelpTableProps {
  data: HelpTableData;
}

export const HelpTable: React.FC<HelpTableProps> = ({ data }) => {
  return (
    <div>
      <h3 className="my-4 font-semibold">{data.title}</h3>

      <table className="w-full text-left">
        <thead>
          <tr>
            {data.headings.map((heading) => (
              <th key={heading} className="py-2 w-1/3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <Fragment key={`${row.title}-title`}>
              <tr>
                <td
                  className="font-semibold border-t border-b border-black"
                  colSpan={3}
                >
                  {row.title}
                </td>
              </tr>
              <tr>
                {row.data.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 align-top">
                    {cell.map(({ type, data }, index) => (
                      <div
                        key={index}
                        className={cn({ "text-gray-400": type === "gray" })}
                      >
                        {data.map((text) => (
                          <div key={text}>{text}</div>
                        ))}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
