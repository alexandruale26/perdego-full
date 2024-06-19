import {
  Backpack,
  UserRound,
  FilePenLine,
  Handshake,
  MoveRight,
} from "lucide-react";
import { Fragment } from "react";

const icons = [
  {
    id: "Backpack",
    icon: Backpack,
    description: "Ai pierdut sau ai gǎsit ceva.",
  },
  {
    id: "UserRound",
    icon: UserRound,
    description: "Creezi cont sau te autentifici.",
  },
  {
    id: "FilePenLine",
    icon: FilePenLine,
    description: "Publici anunțul cu detaliile necesare.",
  },
  {
    id: "Handshake",
    icon: Handshake,
    description: "Eşti contactat pentru înapoiere.",
  },
];

const Card = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="w-full flex flex-col items-center gap-7 text-primary">
      <div className="size-44 flex items-center justify-center bg-grey-6 p-2 rounded-lg shadow-lg">
        <Icon strokeWidth={0.5} className="size-full" />
      </div>
      <span className="text-center text-black">{item.description}</span>
    </div>
  );
};

const PostSteps = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-lg font-bold">Cum funcționeazǎ PERDEGO</h2>
      <div className="w-full flex">
        {icons.map((item, i) => {
          if (i === icons.length - 1) {
            return <Card item={item} key={item.id} />;
          } else {
            return (
              <Fragment key={item.id}>
                <Card item={item} key={item.id} />
                <MoveRight width={250} height={200} strokeWidth={1} />
              </Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PostSteps;
