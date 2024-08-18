import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/ui/Button";
import PostInfos from "./PostInfos";
import { Star, Flag } from "lucide-react";
import BackButton from "../../components/BackButton";
import { api } from "../../services/api";
import { getImageUrl } from "../../services/imageApi";
import { formatPostDate } from "../../utils/formatDate";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/Breadcrumb";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { urlSlug } = useParams();

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

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link>Acasǎ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link>Anunțuri</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link>Pierdute</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>București</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between py-8">
        <p className="font-bold text-xl">{post.title}</p>

        <Button
          variant="iconText"
          className="h-fit flex gap-2 p-0 mr-0.5 text-xl text-black underline"
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

          <BackButton />
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
