import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";


type linkType = {
  title: string;
  url: string;
  icon: string;
};



function Aside() {
  const navigate = useNavigate();
  const navLinks: linkType[] = [
    { title: "home", url: "/", icon: "fa-home" },
    { title: "search", url: "/search", icon: "fa-search" },
    { title: "explore", url: "/explore", icon: "fa-compass" },
    { title: "reels", url: "/reels", icon: "fa-film" },
    { title: "message", url: "/message", icon: "fa-comment" },
    { title: "notification", url: "/notification", icon: "fa-bell" },
    { title: "create", url: "/create", icon: "fa-square-plus" },
  ];

  return (
    <>
      <aside className="min-h-screen max-w-xs w-full py-10 px-8 border">
      <h2 className="text-3xl font-bold font-serif py-5 px-5 mb-6">
        Instagram
      </h2>
      <ul>
        {navLinks.map((link) => {
          return (
            <>
            <li
              onClick={() => navigate(link.url)}
              className="py-3 mb-3 text-lg flex gap-5 items-center  px-5 rounded-xl hover:bg-slate-200 cursor-pointer capitalize"
            >
              <i className={`fa ${link.icon} fa-lg`}></i>
              <span>{link.title}</span>
            </li>
            </>
          );
        })}
        {/* addition links not fitted in array due to certain reason */}
         <li
              onClick={() => navigate('/profile')}
              className="py-3 mb-3 text-lg flex gap-5 items-center  px-5 rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              <img src="/logo192.png" alt="profile pics" className="w-6 h-6 rounded-full ring ring-black bg-black capitalize" />
              <span>profile</span>
            </li>
      </ul>
    </aside>

    </>
  );
}

export default Aside;
