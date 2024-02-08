import { Button, Navbar, NavbarCollapse, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-centered font-semibold dark:text-white">
        <span className="px-2 py-1 bg-black text-white rounded-lg">Task</span>
        Hub
      </Link>
      <form>
        <TextInput
          placeholder="Search"
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as={"div"}>
          <Link to="/contact">Contact</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/signup"} as={"div"}>
          <Link to="/signup">Sign Up</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <Link to="/signin">
        <Button>Sign In</Button>
      </Link>
      <Navbar.Toggle />
    </Navbar>
  );
}
