import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/ui/Button";
import { UserCircle2, Phone } from "lucide-react";
import categories from "../../sharedData/categories";
import { parseLocation } from "../../utils/citiesHelpers";
import { formatDateToRoumanian } from "../../utils/formatDate";
import { api } from "../../services/api";
import { cn } from "../../utils/cn";

const PostInfos = ({ post }) => {
  const [phone, setPhone] = useState(null);

  const handleGetPhone = async () => {
    try {
      const { data } = await api.get(
        `posts/getPhone/iphone-14-albastru-78951c0f`,
      );

      if (data.status !== "success") throw new Error(data.message);
      setPhone(data.data.phone);
    } catch ({ message }) {
      console.log(message); // ! 404
    }
  };

  return (
    <section className="flex-grow space-y-6">
      <PostInfoCard title="Tip anunț">
        <p className="">{getTypeLabel(post.type)}</p>
      </PostInfoCard>

      <PostInfoCard title="Categorie">
        <p className="">{getCategoryLabel(post.category)}</p>
      </PostInfoCard>

      <PostInfoCard title="Locație">
        <p className="">{getLocationLabel(post.location)}</p>
      </PostInfoCard>

      <PostInfoCard title="Informații de contact" className="space-y-3">
        <div className="flex gap-3">
          <UserCircle2 />
          <p>{post.name}</p>
        </div>
        <div className="flex gap-3">
          <Phone />
          {phone ? (
            <a href={`tel:${phone}`} className="underline -mt-0.5">
              {phone}
            </a>
          ) : (
            <Button
              onClick={handleGetPhone}
              className="-mt-0.5"
              variant="text"
              size="text"
            >
              Aratǎ numǎrul
            </Button>
          )}
        </div>
        <p className="text-sm">
          Membru din {formatDateToRoumanian(post.postedBy.createdAt, false)}
        </p>
      </PostInfoCard>
    </section>
  );
};
PostInfos.displayName = "PostInfos";
PostInfos.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    idSlug: PropTypes.string,
    createdAt: PropTypes.string,
    postedBy: PropTypes.shape({ createdAt: PropTypes.string }),
  }),
};

export default PostInfos;

const getTypeLabel = (string) => {
  return string === "gasite" ? "Gǎsite" : "Pierdute";
};

const getCategoryLabel = (string) => {
  return categories.filter((item) => item.value === string)[0].label;
};

const getLocationLabel = (string) => {
  const location = parseLocation(string);
  return location.commune
    ? `${location.name}, comuna ${location.commune}, județul ${location.county}`
    : `${location.name}, județul ${location.county}`;
};

const PostInfoCard = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        "w-full py-4 px-6 border border-grey-6 rounded-lg shadow-md space-y-2",
        className,
      )}
    >
      <p className="font-bold">{title}</p>
      {children}
    </div>
  );
};
PostInfoCard.displayName = "PostInfoCard";
PostInfoCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
