const AppLoader = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 px-6 -mt-10 mx-auto">
      <img
        src="/logo.png"
        alt="perdego logo"
        className="w-[168px] h-[40px] md:w-[253px] md:h-[60px]"
      />
      <div className="app-loader md:max-w-[300px]" />
    </div>
  );
};

export default AppLoader;
