import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { Star } from "lucide-react";
import { api } from "../../services/api";
import { getImageUrl } from "../../services/imageApi";
import PostCard from "./PostCard";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { urlSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`posts/iphone-14-albastru-78951c0f`);

        if (data.status !== "success") throw new Error(data.message);
        setPost(data.data);
        console.log(data.data);
      } catch ({ message }) {
        console.log(message); // ! 404
      }
    };

    fetchPost();
  }, []);

  if (post === null) return <div>Loading...</div>;

  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <SearchBar className="p-0" />

      <section className="flex justify-between py-8">
        <p className="font-bold text-lg">{post.title}</p>

        <Link className="flex items-start gap-2 font-bold text-lg underline">
          <Star size={28} />
          Salveazǎ anunțul
        </Link>
      </section>

      <div className="flex">
        <section className="w-[60%]">
          <img src={getImageUrl(post.image)} alt={post.title} />
        </section>
        <section className="flex-grow space-y-10">
          <div className="w-full py-4 px-6 border border-grey-6 rounded-lg shadow-md space-y-2">
            <p className="font-bold">Tip anunț</p>
            <p className="">{getPostTypeLabel(post.type)}</p>
          </div>

          <div className="w-full py-4 px-6 border border-grey-6 rounded-lg shadow-md space-y-2">
            <p className="font-bold">Categorie</p>
            <p className="">{post.category}</p>
          </div>
        </section>
      </div>
    </main>
  );
};
PostPage.displayName = "Post";

export default PostPage;

const getPostTypeLabel = (string) => {
  return string === "gasite" ? "Gǎsite" : "Pierdute";
};

const getPostCategory = (string) => {
  return string === "gasite" ? "Gǎsite" : "Pierdute";
};
