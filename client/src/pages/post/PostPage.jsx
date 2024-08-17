import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/ui/Button";
import PostInfos from "./PostInfos";
import { Star, Flag, MoveLeft } from "lucide-react";
import { api } from "../../services/api";
import { getImageUrl } from "../../services/imageApi";
import { formatPostDate } from "../../utils/formatDate";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { urlSlug } = useParams();

  // TODO: no image placeholder
  // TODO: Image height
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // const { data } = await api.get(`posts/ssdsdsdsdsdsdsdsdds-672c6145`);
        // const { data } = await api.get(`posts/ssdsdsdsdsdsdsdsdds-2768e1fe`);
        const { data } = await api.get(`posts/ssdsdsdsdsdsdsdsdds-55355c12`);

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
    <main className="w-full max-w-[1200px] my-10 px-6 mx-auto">
      <SearchBar
        className="p-0"
        buttonStyling="bg-primary text-white hover:bg-btn-primary-hover"
      />
      {/* // TODO: finish here - breadcrumbs */}
      <div className="flex flex-row">
        <span className="text-lg mt-10 cursor-pointer">
          <span className="underline">Acasǎ</span> /
          <span className="text-lg mt-10 cursor-pointer">
            <span className="underline"> Anunțuri</span> /
          </span>
        </span>
        <span className="text-lg mt-10 cursor-pointer">
          <span className="underline"> Obiecte personale</span> /
        </span>
        <span className="text-lg mt-10 cursor-pointer">
          <span className="underline"> Cioroiasi, județul Dolj</span>
        </span>
      </div>
      <div className="flex justify-between py-8">
        <p className="font-bold text-lg">{post.title}</p>

        {/* // TODO: button here */}
        <Link className="flex items-start gap-2 font-bold text-lg underline">
          <Star size={28} />
          Salveazǎ anunțul
        </Link>
      </div>
      <div className="flex gap-10">
        <div className="w-[55%] flex items-center justify-center">
          {/* try with no image */}
          <img
            className="rounded-lg"
            src={getImageUrl(post.image)}
            alt={post.title}
          />
        </div>

        <PostInfos post={post} />
      </div>
      <section className="flex gap-6 my-6">
        <div className="max-w-[55%] space-y-6">
          <p>{post.description}</p>
          <p className="font-semibold">
            Publicat {formatPostDate(post.createdAt, "pe ")}
          </p>

          <Link className="w-fit flex items-center gap-3 text-lg underline">
            <MoveLeft /> <span>Înapoi</span>
          </Link>
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
