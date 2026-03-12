import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);

  const links = [
    { name: "Home", to: "/" },
    { name: "Meus Filmes", to: "/galery" },
    { name: "Buscar Filmes", to: "/search" }
  ];

  const baseLinkStyle =
    "text-sm font-medium transition-colors duration-200";

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-800"
          >
            MinhaLogo
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `${baseLinkStyle} ${
                    isActive
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* User menu */}
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black focus:outline-none"
                >
                  <User size={20} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${baseLinkStyle} ${
                    isActive
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-black"
                        : "text-gray-600 hover:text-black"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              {token ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-base font-medium text-gray-600 hover:text-black"
                >
                  Sair
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="block text-base font-medium text-gray-600 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
