import Link from "next/link";
import { useState } from "react";
import { AdditionServiceItem } from "./addition-service-list/index";
import Button from "@/components/button";

interface AdditionServiceListProps {
  primaryProductId: string;
  date: string;
  additionServices: any;
}

function AdditionServiceList({
  primaryProductId,
  date,
  additionServices,
}: AdditionServiceListProps) {
  const [optionRevealedServiceId, setOptionRevealedServiceId] = useState<
    string | null
  >(null);

  const handleAddAdditionServiceClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className="p-2 pr-0 flex flex-col gap-2">
      <div className="bg-white rounded overflow-hidden">
        {additionServices.map((addition: any) => (
          <AdditionServiceItem
            key={addition.extraProductId}
            additionService={addition}
            optionRevealedServiceId={optionRevealedServiceId}
            setOptionRevealedServiceId={setOptionRevealedServiceId}
          />
        ))}
        {additionServices.length === 0 && (
          <div className="h-[216px] flex justify-center items-center text-slate-500">
            無附加服務
          </div>
        )}
      </div>
      <Link
        href={`/booking/select-service/${primaryProductId}/${date}/everything`}
        className="w-full"
        onClick={handleAddAdditionServiceClick}
      >
        <Button className="w-full">新增附加服務</Button>
      </Link>
    </div>
  );
}

export { AdditionServiceList };
