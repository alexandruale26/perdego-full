import Link from "../../components/Link";

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

// TODO: redo the urls before publishing the app
const Footer = () => {
  return (
    <footer className="w-full h-[370px] flex items-center justify-center self-end bg-grey-6 rounded-lg shadow-[0_-2px_8px_rgba(0,0,0,0.3)]">
      <nav className="w-full max-w-[1200px] flex items-start justify-between pb-6 px-6">
        <ul className="grid grid-rows-6 grid-cols-2 gap-y-4 flex-grow">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link to={link.url} className="w-fit text-lg no-underline">
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-4">
          <span>Descarcǎ aplicația pentru mobil:</span>
          <ul className="w-full flex gap-4">
            <li>
              <img src="/stores/g_play.png" alt="google play store" />
            </li>
            <li>
              <img src="/stores/a_store.png" alt="apple store" />
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};
Footer.displayName = "Footer";

export default Footer;
