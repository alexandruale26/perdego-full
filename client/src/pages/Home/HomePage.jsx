import SearchBar from "../../components/SearchBar";
import PostSteps from "./PostSteps";
import PerdegoTip from "./PerdegoTip";
import Categories from "./Categories";
import LatestPosts from "./LatestPosts";
import LeaveAReview from "./LeaveAReview";

const HomePage = () => {
  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <header className="w-full flex flex-col items-center justify-between bg-primary bg-hero bg-auto bg-no-repeat bg-center h-[500px] lg:bg-cover 2xl:h-[650px]">
        <SearchBar buttonStyling="bg-grey-6 hover:text-white hover:bg-secondary hover:text-black" />

        <h1 className="w-full h-18 flex items-center justify-center bg-white/90 text-xl text-center font-bold px-6">
          Ai pierdut un lucru important pentru tine sau ai găsit un obiect
          căruia vrei să-i găsești proprietarul? PERDEGO te ajută.
        </h1>
      </header>

      <section className="w-full max-w-[1200px] py-10 px-6 mx-auto">
        <PostSteps />
        <PerdegoTip />
      </section>

      <Categories />
      <LatestPosts />

      <section className="w-full max-w-[1200px] pt-2 pb-14 px-6 mx-auto">
        <LeaveAReview />
      </section>
    </main>
  );
};
HomePage.displayName = "Home";

export default HomePage;
