import SearchBar from "../components/Home/SearchBar";
import PostSteps from "../components/Home/PostSteps";
import PerdegoTip from "../components/Home/PerdegoTip";
import ObjectCategories from "../components/Home/ObjectCategories";
import LatestPosts from "../components/Home/LatestPosts";
import LeaveAReview from "../components/Home/LeaveAReview";

const Home = () => {
  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-between bg-primary bg-hero bg-auto bg-no-repeat bg-center h-[500px] lg:bg-cover 2xl:h-[650px]">
        {/* SEARCH */}
        <SearchBar />

        <h1 className="w-full h-18 flex items-center justify-center bg-white/90 text-lg text-center font-bold px-6">
          Ai pierdut un lucru important pentru tine sau ai găsit un obiect
          căruia vrei să-i găsești proprietarul? PERDEGO te ajută.
        </h1>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full max-w-[1200px] py-10 px-6 mx-auto">
        <PostSteps />
        <PerdegoTip />
      </section>

      {/* OBJECT CATEGORIES */}
      <ObjectCategories />

      {/* LATEST POSTS */}
      <LatestPosts />

      {/* LEAVE A REVIEW */}
      <section className="w-full max-w-[1200px] pt-2 pb-10 px-6 mx-auto">
        <LeaveAReview />
      </section>
    </main>
  );
};
Home.displayName = "Home";

export default Home;
