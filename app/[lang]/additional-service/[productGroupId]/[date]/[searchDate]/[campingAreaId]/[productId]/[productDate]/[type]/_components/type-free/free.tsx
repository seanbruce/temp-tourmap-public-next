import Button from "@/components/button";

interface FreeProps {
  id: string;
  url: string;
  name: string;
  description: string;
}

function Free({ id, url, name, description }: FreeProps) {
  return (
    <div
      key={id}
      className="flex flex-nowrap max-sm:flex-col border-2 border-brand-gold-dark"
    >
      <div className="w-1/2 h-1/2 self-center pb-[50%] overflow-hidden relative shrink-0 max-sm:w-full max-sm:pb-[100%]">
        <img
          src={url}
          alt={name}
          className="w-full h-full absolute inset-0 object-fill"
        />
      </div>
      <div className="grow bg-stone-900 p-2 flex flex-col">
        <div className="mb-4 flex flex-col max-sm:flex-row flex-nowrap items-start max-sm:items-end">
          <p className="font-bold text-xl text-stone-50 line-clamp-1">{name}</p>
          <p className="max-sm:ml-auto text-sm">
            <span className="mr-2 font-bold">免費</span>
            <span className="text-brand-gold line-through">NTD$ 1240</span>
          </p>
        </div>
        <p className="text-stone-100 text-sm mb-2">{description}</p>
        <div className="mt-auto">
          {name === "洗漱用品" ? (
            <p className="py-1 text-stone-100">已在購物車中</p>
          ) : (
            <Button variant="stroked" className="w-full">
              加入購物車
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Free };
