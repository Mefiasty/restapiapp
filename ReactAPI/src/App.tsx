import { useEffect, useRef, useState } from "react";
import "./App.css";
import { gsap } from "gsap";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, []);
  console.log(characters);
  const menuItems = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "About",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
  ];

  const [isMenuActive, setIsMenuActive] = useState(false);
  const test = useRef(null);
  const handleClik = () => {
    setIsMenuActive(!isMenuActive);
    setTimeout(() => {
      //@ts-ignore
      const width = test.current.offsetWidth;
      gsap.fromTo(
        test.current,
        { x: width },
        { x: 0, duration: 0.65, delay: 0 }
      );
    }, 1);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        //@ts-ignore
        test.current.style = "";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="flex items-center relative justify-between bg-sky-900 text-white min-h-20 p-2 text-lg font-extrabold md:text-center md:text-2xl ">
        <h1>RestAPI FanPage App</h1>
        <nav
          ref={test}
          className={`menu max-md:absolute bottom-0 right-0 max-md:translate-y-full bg-red-500  ${
            isMenuActive ? "" : "max-md:hidden"
          }   `}
        >
          <ul className="flex max-md:flex-col text-right w-full">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="block py-2 px-2">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="md:hidden mt-2" onClick={() => handleClik()}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      <div className="">
        <div
          id="container"
          className="md:justify-center md:box-border md:w-11/12 md:m-auto"
        >
          <div className=" text-center">
            <h1 className="font-bold text-4xl md:text-9xl">Ditto</h1>

            <img
              src={
                //@ts-ignore
                characters.sprites?.front_default
              }
              alt={
                //@ts-ignore
                characters.name
              }
              className=" h-48 w-48  border-4 md:border-0 md:w-2/6 md:h-2/6 border-sky-900  mx-auto "
            />
            <div className="md:w-3/5 w-48 inline-block justify-center relative">
              <h2 className="border-2  border-sky-900 text-stone-50 bg-sky-900 bg-opacity-70 ">
                Name:{" "}
                {
                  //@ts-ignore
                  characters.name
                }
              </h2>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70 ">
                Height:{" "}
                {
                  //@ts-ignore
                  characters.height
                }
              </h2>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70 ">
                Weight:{" "}
                {
                  //@ts-ignore
                  characters.weight
                }
              </h2>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70 ">
                Base Experience:{" "}
                {
                  //@ts-ignore
                  characters.base_experience
                }
              </h2>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70 ">
                Abilities:
              </h2>
              <ul className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                {
                  //@ts-ignore
                  characters.abilities?.map((item) => (
                    <li key={item.ability.name}>{item.ability.name}</li>
                  ))
                }
              </ul>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                Moves:
              </h2>

              <ul className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                {
                  //@ts-ignore
                  characters.moves?.map((item) => (
                    <li key={item.move.name}>{item.move.name}</li>
                  ))
                }
              </ul>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                Types:
              </h2>
              <ul className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                {
                  //@ts-ignore
                  characters.types?.map((item) => (
                    <li key={item.type.name}>{item.type.name}</li>
                  ))
                }
              </ul>
              <h2 className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                Stats:
              </h2>
              <ul className="border-2  border-sky-900 text-stone-50  bg-sky-900 bg-opacity-70">
                {
                  //@ts-ignore
                  characters.stats?.map((item) => (
                    <li key={item.stat.name}>
                      ⚔ {item.stat.name}: {item.base_stat} ⚔
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white absolute bottom-0 w-full">
        Api used to create this page:{" "}
        <a href="https://pokeapi.co/" className="hover:text-red-700">
          PokeApi
        </a>
      </div>
    </>
  );
}

export default App;
