import { Button, Dropdown, Navbar, TextInput, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user.user);
  const initials = currentUser
    ? currentUser.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-centered font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gray-800 text-white rounded-lg">
          Task
        </span>
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
        {currentUser ? (
          <>
            <Navbar.Link active={path === "/backlog"} as={"div"}>
              <Link to="/backlog">Backlog</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/dashboard"} as={"div"}>
              <Link to="/dashboard">Dashboard</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={"div"}>
              <Link to="/projects">Projects</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
              <Link to="/about">About</Link>
            </Navbar.Link>
            {currentUser.is_admin && (
              <>
                <Navbar.Link active={path === "/admin"} as={"div"}>
                  <Link to="/admin">Admin</Link>
                </Navbar.Link>
              </>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </Navbar.Collapse>
      {currentUser ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar placeholderInitials={initials} alt="user" rounded></Avatar>
          }
        >
          <span className="block text-sm">@{currentUser.name}</span>
          <span className="block text-sm">@{currentUser.email}</span>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to="/signout">Sign Out</Link>
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Link
          to="/signin"
          className="self-centered font-semibold dark:text-white"
        >
          <Button className="px-2 py-1 bg-gray-800 text-white rounded-lg">
            Sign In
          </Button>
        </Link>
      )}
      <Navbar.Toggle />
    </Navbar>
  );
}
