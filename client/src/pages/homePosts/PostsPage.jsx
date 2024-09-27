import BreadrumbsNav from "../../components/breadrumbs/BreadrumbsNav";
import SectionCard from "../../components/SectionCard";

const PostsPage = () => {
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto flex flex-col gap-6">
      <BreadrumbsNav />
      <SectionCard></SectionCard>
    </main>
  );
};

export default PostsPage;
