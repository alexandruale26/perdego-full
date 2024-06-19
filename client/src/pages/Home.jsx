import { Link } from "react-router-dom";
import * as Input from "../components/ui/input";
import Button from "../components/ui/button";
import { Search } from "lucide-react";
import PostSteps from "../components/PostSteps";

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="w-full min-w-full">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-between bg-primary bg-hero bg-auto bg-no-repeat bg-center h-[500px] lg:bg-cover 2xl:h-[650px]">
        {/* SEARCH */}
        <form
          onSubmit={handleSubmit}
          className={"w-full max-w-[1000px] flex mx-auto gap-2 px-10 pt-4"}
        >
          <Input.Root className="flex">
            <div className="size-5 p-0 rounded-full absolute inset-y-0 left-4 shrink-0 top-1/2 -translate-y-1/2">
              <Search width={20} height={20} />
            </div>

            <Input.Field
              id="search"
              variant="search"
              placeholder="Cauți ceva anume?"
              maxLength={50}
            />
            <Input.Clear />
          </Input.Root>

          <Input.Root className="max-w-[250px]">
            <Input.Field id="location" variant="search" placeholder="Locație" />
            <Input.Clear />
          </Input.Root>

          <Button
            variant="iconText"
            size="iconText"
            className="bg-grey-6 rounded-md text-base"
            asChild
          >
            <Link to="/anunturi">
              <span className="text-black">Cǎutare</span>
              <Search />
            </Link>
          </Button>
        </form>
        <h1 className="w-full h-18 flex items-center justify-center bg-white/90 text-lg text-center font-bold px-6">
          Ai pierdut un lucru important pentru tine sau ai găsit un obiect
          căruia vrei să-i găsești proprietarul? PERDEGO te ajută.
        </h1>
      </section>

      {/* HOW IT WORKS */}
      <div className="w-full max-w-[1200px] py-10 px-6 mx-auto">
        <PostSteps />

        <div className="w-full max-h-[245px] flex items-center justify-between gap-8 bg-grey-6 rounded-lg pl-10 pr-6 mt-6 overflow-hidden">
          <div className="max-w-[40%] flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-primary leading-none -mt-2">
              Sfatul PERDEGO
            </h2>
            <p className="tracking-wide leading-relaxed">
              Dacă adaugi poză anunțului tău, ai șanse mai mari de a găsi
              obiectul pierdut sau proprietarul.
            </p>
            <Button asChild variant="cta" size="cta" className="w-fit mt-">
              <Link to="/anunturi/nou">Adaugǎ anunț</Link>
            </Button>
          </div>
          <img
            src="/graph_found.svg"
            alt="perdego banner"
            className="max-w-[60%] object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
