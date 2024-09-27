import SectionCard from "../../components/SectionCard";
import Link from "../../components/Link";

const anchorClass = {
  className:
    "inline text-primary font-semibold px-0.5 focus-visible:outline-secondary underline",
};

const PostCreatedPage = () => {
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <Link to="/" replace hasArrow className="mb-20">
        Acasǎ
      </Link>

      <SectionCard>
        <h1 className="text-3xl text-primary font-bold text-center mb-10">
          Anunțul tău a fost adăugat cu succes!
        </h1>

        <div className="flex flex-col gap-4 my-10 text-xl">
          <p>
            Poți vedea anunțul în{" "}
            <Link to="/administrare/anunturi" replace {...anchorClass}>
              Anunțurile tale
            </Link>
            . Acesta va fi public pentru o perioadă de 20 de zile.
          </p>
          <p>
            Conform{" "}
            <a
              href="https://www.codulcivil.ro/art-942-Proprietatea-bunului-gasit/"
              rel="noopener noreferrer"
              target="_blank"
              {...anchorClass}
            >
              Art. 942 din Codul Civil
            </a>
            , bunul gǎsit trebuie restituit proprietarului în termen de 10 zile
            sau predat organului de poliție din localitatea în care a fost
            găsit.
          </p>
        </div>
      </SectionCard>
    </main>
  );
};

export default PostCreatedPage;
