import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import PostInfos from "./PostInfos";
import { Star, Flag } from "lucide-react";
import Link from "../../components/Link";
import { api } from "../../services/api";
import { getImageUrl } from "../../services/imageApi";
import { formatPostDate } from "../../utils/formatDate";
import BreadrumbsNav from "../../components/breadrumbs/BreadrumbsNav";

import {
  getTypeLabel,
  getCategoryLabel,
  getLocationLabel,
} from "../../utils/postDataHelpers";

// TODO: id user sees his's post, could be redirected to edit it from here
// TODO: PageLoader merge instant aici -> aduga delay
const PostPage = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { urlSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`posts/gasit-catel-adorabil-8746acd5`);

        if (data.status !== "success") throw new Error(data.message);
        setPost(data.data);
      } catch {
        navigate("/404", { replace: true });
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
      <BreadrumbsNav crumbsExtension={getCrumbsExtension(post)} />

      <div className="flex justify-between py-8">
        <h1 className="font-bold text-xl">{post.title}</h1>

        <Button
          variant="iconText"
          className="h-fit flex gap-2 p-1 -mt-1 text-xl text-black underline"
        >
          <Star size={28} />
          Salveazǎ anunțul
        </Button>
      </div>

      <div className="flex gap-10">
        <div className="w-[55%] flex items-center justify-center">
          <img
            className="rounded-lg"
            src={getImageUrl(post.image)}
            alt={post.title}
            onError={(e) => (e.currentTarget.src = "/img-placeholder.jpg")}
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

          <Link hasArrow>Înapoi</Link>
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

const getCrumbsExtension = (post) => [
  {
    url: `type=${post.type}`,
    crumb: getTypeLabel(post.type),
  },
  {
    url: `category=${post.category}`,
    crumb: getCategoryLabel(post.category),
  },
  {
    url: `location=${post.location}`,
    crumb: getLocationLabel(post.location),
  },
  {
    url: "",
    crumb: post.title,
  },
];
