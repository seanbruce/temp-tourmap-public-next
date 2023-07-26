import { Free } from "./type-free/index";

interface FreeGood {
  id: string;
  name: string;
  url: string;
  description: string;
}

interface TypeFreeProps {
  id: string;
  date: string;
}

const FAKE_FREE_GOODS: FreeGood[] = [
  {
    id: "1",
    name: "可樂",
    url: "https://source.unsplash.com/random/",
    description: "可樂 * 2罐",
  },
  {
    id: "2",
    name: "洗漱用品",
    url: "https://source.unsplash.com/random/",
    description: "牙刷 * 2支、牙膏 * 1支",
  },
  {
    id: "3",
    name: "寵物寄存服務",
    url: "https://source.unsplash.com/random/",
    description: "寵物寄存服務 * 1次",
  },
  {
    id: "4",
    name: "生日蛋糕",
    url: "https://source.unsplash.com/random/",
    description: "生日蛋糕 * 1個",
  },
];

export default function TypeFree({ id, date }: TypeFreeProps) {
  return (
    <div>
      <p className="text-brand-gold mb-4">
        剩餘贈品數量： <span className="font-bold">4</span>
      </p>
      <div className="grid grid-cols-2 max-sm:grid-cols-1  gap-4">
        {FAKE_FREE_GOODS.map((freeGood) => (
          <Free key={freeGood.id} {...freeGood} />
        ))}
      </div>
    </div>
  );
}
