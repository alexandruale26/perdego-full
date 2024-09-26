import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../components/ui/Button";
import { UserCircle2, Phone } from "lucide-react";
import { formatDateToRoumanian } from "../../utils/formatDate";
import PostInfoCard from "./PostInfoCard";
import { api } from "../../services/api";
import {
  getTypeLabel,
  getCategoryLabel,
  getLocationLabel,
} from "../../utils/postDataHelpers";

const PostInfos = ({ post }) => {
  const [phone, setPhone] = useState(null);

  // TODO: fix getPhone
  const handleGetPhone = async () => {
    try {
      const { data } = await api.get(
        `posts/getPhone/pierdut-iphone-13-albastrru-906251ce`,
      );

      if (data.status !== "success") throw new Error(data.message);
      setPhone(data.data.phone);
    } catch ({ message }) {
      console.log(message); // TODO: 404
    }
  };

  return (
    <section className="flex-grow space-y-6">
      <PostInfoCard title="Tip anunț">
        <p>{getTypeLabel(post.type)}</p>
      </PostInfoCard>

      <PostInfoCard title="Categorie">
        <p>{getCategoryLabel(post.category)}</p>
      </PostInfoCard>

      <PostInfoCard title="Locație">
        <p>{getLocationLabel(post.location)}</p>
      </PostInfoCard>

      {post.authorities.length > 0 ? (
        <PostInfoCard title="Obiect predat autoritǎților">
          <p>{post.authorities}</p>
        </PostInfoCard>
      ) : null}

      {post.reward ? (
        <PostInfoCard title="Recompensă oferită">
          <p>Se oferǎ recompensǎ</p>
        </PostInfoCard>
      ) : null}

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
    reward: PropTypes.bool,
    authorities: PropTypes.string,
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
