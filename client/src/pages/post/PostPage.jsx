import SearchBar from "../../components/SearchBar";

const PostPage = () => {
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <SearchBar className="p-0" />
      <div className="flex">
        <p>Pierdut toc ochelari</p>
      </div>
    </main>
  );
};
PostPage.displayName = "Post";

export default PostPage;
