import { Food } from "./type-food/index";

interface TypeFoodProps {
  id: string;
  date: string;
}

interface Food {
  id: string;
  name: string;
  url: string;
  description: string;
}

const FAKE_FOODS: Food[] = [
  {
    id: "1",
    name: "麵包",
    url: "https://source.unsplash.com/random/",
    description:
      "具有迷人的外觀和令人愉悅的香氣。它的外皮金黃酥脆，充滿了微妙的酵母香氣，讓人無法抵擋地想要咬上一口。當你撕開它，麵包內部彈性十足，細緻而富有彈性。這裡面可以有多種口感，有些麵包蓬鬆輕盈，蓮霧般柔軟，而有些則帶有濃郁的麥香和營養豐富的麥片或堅果。每一口都能帶來滿足感，讓你感受到麵粉的甜美味道和結合各種美味成分的完美平衡。無論是單獨享用、夾著美味醬料或者作為沙拉的伴侶，麵包都是一種經典而多功能的美食。它不僅填飽你的肚子，還能為你的味蕾帶來無窮的樂趣和滿足感。",
  },
  {
    id: "2",
    name: "披薩",
    url: "https://source.unsplash.com/random/",
    description:
      "以其獨特的口味和多樣的配料而聞名。一旦披薩被帶到你面前，你會被它的外觀所吸引。酥脆的餅底上覆蓋著豐厚的番茄醬，讓你嘴裡充滿了蕃茄的酸甜滋味。那鬆軟而彈牙的麵團，散發出誘人的麵包香氣，讓人無法抗拒。披薩上布滿了各種美味的配料，像是新鮮的蔬菜、多汁的香腸、濃郁的芝士和美味的香料。每一口都是一種美味的組合，完美地融合在一起。咀嚼時，你可以感受到餅底的脆度、配料的鮮味和芝士的濃郁。這種多層次的口感和豐富的味道讓人愛不釋手。披薩是一道美食，無論是在單獨享用還是和朋友分享，都能帶來無盡的滿足感和快樂。無論你喜歡傳統的瑞士奶酪披薩、意大利瑪格麗特披薩，還是創意十足的素食或海鮮披薩，它總能成為一頓美味的盛宴",
  },
  {
    id: "3",
    name: "沙拉",
    url: "https://source.unsplash.com/random/",
    description:
      "沙拉不僅令人愉悅，還有無限的變化和組合方式。你可以根據自己的喜好和季節選擇不同的配料，例如番茄、青瓜、胡蘿蔔、紅洋蔥、火雞肉或煙熏三文魚等等。此外，添加各種香料、醬汁和油醋調味可以帶來豐富的風味層次，從清淡的柠檬汁到濃郁的鳳梨醬，都能增添一份驚喜。",
  },
  {
    id: "4",
    name: "漢堡",
    url: "https://source.unsplash.com/random/",
    description:
      "咬下去，你會感受到麵包的柔軟和肉餅的豐富滋味。肉餅經過烤煎，充滿了多汁的肉汁和香氣，每一口都帶來滿足感。你可以選擇不同的肉類，如牛肉、雞肉或羊肉，每種都有獨特的風味。加上奶酪、煙燻火腿、炸洋蔥圈或煎蛋等額外的配料，更能提升漢堡的豐富度和口感。",
  },
];

export function TypeFood({ id, date }: TypeFoodProps) {
  return (
    <div className="flex flex-col gap-4">
      {FAKE_FOODS.map((food) => (
        <Food key={food.id} {...food} />
      ))}
    </div>
  );
}
