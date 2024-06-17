const Header = () => {
  return (
    <header className="flex justify-between items-center ml-8 mr-9 my-1 z-10">
      <img src="logo.png" alt="logo" className="w-[253px] h-[60px]" />
      <div>Pierdute | Gasite</div>
      <div>Mesaje</div>
      <div>Contul tau</div>
      <button className="rounded-lg bg-primary p-4 text-white">
        Adauga anunt nou
      </button>
    </header>
  );
};

export default Header;
