import { useEffect } from "react";
import { LogOut } from "../functions/app";
import { Image } from "astro:assets";

export default function LogoutLink() {
  useEffect(() => {
    const logoutLink = document.querySelector('#logout-link');
    logoutLink?.addEventListener('click', (e) => {
      e.preventDefault();
      LogOut();
      window.location.href = '/';
    });
  }, []);

  return (
    <>
      <a id="logout-link" href="/">
        <img src="/astro-frontend/logout.svg" alt="" width={30} height={30} className="rounded-full" loading="eager"/>
      </a>
    </>
  );
};