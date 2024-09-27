import BreadrumbsNav from "../../components/breadrumbs/BreadrumbsNav";
import SectionCard from "../../components/SectionCard";
import ExpandedSearchBar from "../../components/search/ExpandedSearchBar";

const PostsPage = () => {
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto flex flex-col gap-6">
      <BreadrumbsNav />
      <SectionCard>
        <ExpandedSearchBar />
      </SectionCard>
    </main>
  );
};

export default PostsPage;
