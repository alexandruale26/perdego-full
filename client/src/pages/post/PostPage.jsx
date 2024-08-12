import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/ui/Button";
import PostInfos from "./PostInfos";
import { Star, Flag } from "lucide-react";
import { api } from "../../services/api";
import { getImageUrl } from "../../services/imageApi";
import { formatPostDate } from "../../utils/formatDate";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { urlSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`posts/iphone-14-albastru-78951c0f`);

        if (data.status !== "success") throw new Error(data.message);
        setPost(data.data);
      } catch ({ message }) {
        console.log(message); // ! 404
      }
    };

    fetchPost();
  }, []);

  const handleReportPost = () => {
    console.log("report post");
  };

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

      <div className="flex gap-10">
        <section className="w-[55%] flex items-center justify-center bg-grey-6 border border-grey-5 rounded-lg">
          {/* try with no image */}
          <img
            className="object-cover"
            src={getImageUrl(post.image)}
            alt={post.title}
          />
        </section>

        <PostInfos post={post} />
      </div>

      <section className="flex gap-6 my-6">
        <div className="max-w-[55%] space-y-6">
          <p>{post.description}</p>
          <p className="font-semibold">
            Publicat pe {formatPostDate(post.createdAt)}
          </p>
        </div>

        <div className="flex-1 flex justify-end">
          <Button
            onClick={handleReportPost}
            variant="text"
            size="text"
            className="gap-2 text-destructive text-sm"
          >
            <Flag size={20} /> Raporteazǎ anunțul
          </Button>
        </div>
      </section>
    </main>
  );
};
PostPage.displayName = "Post";

export default PostPage;
