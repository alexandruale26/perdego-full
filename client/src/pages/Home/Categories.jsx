import { Link } from "react-router-dom";

const categories = [
  {
    name: "portofele_documente_carduri",
    url: "/categories/portofele_documente_si_carduri.svg",
  },
  {
    name: "electronice",
    url: "/categories/electronice.svg",
  },
  {
    name: "ceasuri_si_bijuterii",
    url: "/categories/ceasuri_si_bijuterii.svg",
  },
  {
    name: "obiecte_personale",
    url: "/categories/obiecte_personale.svg",
  },
  {
    name: "genti_si_bagaje",
    url: "/categories/genti_si_bagaje.svg",
  },
  {
    name: "haine_si_accesorii",
    url: "/categories/haine_si_accesorii.svg",
  },
  {
    name: "jucarii_si_obiecte_copii",
    url: "/categories/jucarii_si_obiecte_copii.svg",
  },
  {
    name: "animale_de_companie",
    url: "/categories/animale_de_companie.svg",
  },
  {
    name: "obiecte_de_transport",
    url: "/categories/obiecte_de_transport.svg",
  },
  {
    name: "altele",
    url: "/categories/altele.svg",
  },
];

// TODO: link the cards with a search parameter
const Categories = () => {
  return (
    <section className="w-full max-w-[1200px] flex flex-col items-center gap-8 pt-2 pb-10 px-6 mx-auto">
      <h2 className="text-xl font-bold">Categorii anunțuri</h2>
      {/* <div className="w-full grid grid-cols-5 justify-items-center gap-y-8"> */}
      <div className="w-full grid grid-cols-5 justify-items-center gap-y-8">
        {categories.map((category) => {
          return (
            <Link
              to={`/anunturi/?cat=${category.name}`}
              key={category.name}
              className="size-44 bg-primary rounded-lg overflow-hidden"
            >
              <img
                src={category.url}
                alt={category.name}
                className="w-full h-full object-cover translate-x-1"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
Categories.displayName = "Categories";

export default Categories;
