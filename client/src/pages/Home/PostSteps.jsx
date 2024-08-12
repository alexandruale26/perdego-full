import {
  Backpack,
  UserRound,
  FilePenLine,
  Handshake,
  MoveRight,
} from "lucide-react";
import PropTypes from "prop-types";
import { Fragment } from "react";

const icons = [
  {
    id: "Backpack",
    icon: Backpack,
    description: "Ai pierdut sau ai gǎsit un obiect.",
  },
  {
    id: "UserRound",
    icon: UserRound,
    description: "Creezi cont sau te autentifici.",
  },
  {
    id: "FilePenLine",
    icon: FilePenLine,
    description: "Publici un anunț nou.",
  },
  {
    id: "Handshake",
    icon: Handshake,
    description: "Eşti contactat pentru înapoiere.",
  },
];

const PostStepsCard = ({ item }) => {
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
PostStepsCard.displayName = "PostStepsCard";
PostStepsCard.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const PostSteps = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-lg font-bold">Cum funcționeazǎ PERDEGO</h2>
      <div className="w-full flex">
        {icons.map((item, i) => {
          if (i === icons.length - 1) {
            return <PostStepsCard item={item} key={item.id} />;
          } else {
            return (
              <Fragment key={item.id}>
                <PostStepsCard item={item} key={item.id} />
                <MoveRight width={250} height={200} strokeWidth={1} />
              </Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};
PostSteps.displayName = "PostSteps";

export default PostSteps;
