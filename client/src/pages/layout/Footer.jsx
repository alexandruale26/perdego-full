import { Link } from "react-router-dom";

const links = [
  {
    name: "Acasǎ",
    url: "/",
  },
  {
    name: "Despre noi",
    url: "/despre-noi",
  },
  {
    name: "Anunțuri",
    url: "/anunturi",
  },
  {
    name: "Informații utile",
    url: "/informatii-utile",
  },
  {
    name: "Adaugǎ anunț",
    url: "/anunturi/nou",
  },
  {
    name: "Recenzii utilizatori",
    url: "/recenzii",
  },
  {
    name: "Contul tǎu",
    url: "/administrare/contul-meu",
  },
  {
    name: "Termeni și condiții",
    url: "/termeni-si-conditii",
  },
  {
    name: "Anunțurile tale",
    url: "/administrare/anunturile-mele",
  },
  {
    name: "Politica cookies",
    url: "/politica-cookies",
  },
  {
    name: "Anunțuri salvate",
    url: "/administrare/anunturi-salvate",
  },
  {
    name: "Politica de confidențialitate",
    url: "/politica-de-confidentialitate",
  },
];

const Footer = () => {
  return (
    <footer className="w-full h-[370px] flex items-center justify-center text-md bg-grey-6 mt-4 rounded-lg shadow-[0_-2px_6px_rgba(0,0,0,0.4)]">
      <div className="w-full max-w-[1200px] flex items-start justify-between pt-2 pb-10 px-6 mx-auto">
        <div className="grid grid-rows-6 grid-cols-2 gap-y-4 flex-grow">
          {links.map((link) => {
            return (
              <Link key={link.name} to={link.url} className="w-fit">
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <span>Descarcǎ aplicația pentru mobil:</span>
          <div className="w-full flex gap-4">
            <img src="/stores/g_play.png" alt="google play store" />
            <img src="/stores/a_store.png" alt="apple store" />
          </div>
        </div>
      </div>
    </footer>
  );
};
Footer.displayName = "Footer";

export default Footer;
