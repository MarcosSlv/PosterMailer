function Header({ title }) {
  return (
    <div className="container mx-auto my-5">
      <div className="flex justify-center">
        <div className="w-full lg:w-auto">
          <h1 className="text-center font-bold text-4xl m-4">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;