import Image from "next/image";

export const NavBar = () => {
  return (
    <header >
      <div className="nav-bar  w-full top-0  left-0 fixed bg-black text-white z-50">
        <div className="flex items-center justify-between m-4 p-2 ">
          <button className="p-2">Menu</button>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Image src={"logo.svg"} alt={"cote-royal"} width={180} height={30}
            className="w-32 md:w-44"
             />
          </div>
          <div className="flex ">Icons</div>
        </div>
      </div>
    </header>
  );
};
