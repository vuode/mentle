import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SubjectCardProps {
  id: number;
  title: string;
  path: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  title,
  path,
}) => {
  return (
    <Link href={path}>
      <div className="p-4 shadow rounded-md bg-white">
        <div className="flex justify-center items-center p-1 bg-willow-400 rounded-md text-white font-mono font-semibold w-10 h-10">
          {id < 10 ? `0${id}` : id}
        </div>
        <h4 className="my-2 text-lg font-semibold">{title}</h4>
        <div className="flex justify-end">
          <ArrowRight />
        </div>
      </div>
    </Link>
  );
};
