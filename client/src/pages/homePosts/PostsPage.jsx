import BreadrumbsNav from "../../components/breadrumbs/BreadrumbsNav";
import SectionCard from "../../components/SectionCard";
import SearchBar from "../../components/search/SearchBar";

const PostsPage = () => {
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto flex flex-col gap-8">
      <BreadrumbsNav />
      <SectionCard>
        <SearchBar />
      </SectionCard>
    </main>
  );
};

export default PostsPage;
