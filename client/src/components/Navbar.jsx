import { navLists } from "../constants";
import "../styles/components/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePollVertical,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onOpenModal }) => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <FontAwesomeIcon
          icon={faSquarePollVertical}
          size="xl hover:text-white transition-all"
        />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray underline_custom hover:text-white transition-all"
              onClick={() => {
                if (nav === "Library") {
                  onOpenModal();
                }
              }}
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl hover:text-white transition-all"
          />
          <FontAwesomeIcon
            icon={faBars}
            size="xl hover:text-white transition-all"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
