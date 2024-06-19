import { Link } from "react-router-dom";
import Button from "./ui/button";

const latestPosts = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

const LatestPosts = () => {
  return (
    <section className="w-full max-w-[1200px] flex flex-col items-center gap-8 pt-2 pb-10 px-6 mx-auto">
      <h2 className="text-lg font-bold">Cele mai recente anunțuri</h2>
      <div className="w-full flex gap-6">
        {latestPosts.map((post) => {
          return (
            <Link
              to={`/anunturi/${post.id}`}
              key={post.id}
              className="w-[390px] h-[490px] bg-grey-6 rounded-lg shadow-md overflow-hidden"
            ></Link>
          );
        })}
      </div>
      <Button asChild>
        <Link to="/anunturi">Vezi toate anunțurile</Link>
      </Button>
    </section>
  );
};

export default LatestPosts;
