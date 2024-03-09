import { useEffect } from "react";
import { LogOut } from "../../functions/app.ts";
import { Image } from "astro:assets";

export default function LogoutLink() {
  useEffect(() => {
    const logoutLink = document.querySelector('#logout-link');
    logoutLink?.addEventListener('click', (e) => {
      e.preventDefault();
      LogOut();
      window.location.href = '/astro-frontend/';
    });
  }, []);

  return (
    <>
      <a id="logout-link" href="/astro-frontend/">
        <img src="/astro-frontend/logout.svg" alt="" width={30} height={30} className="rounded-full" loading="eager"/>
      </a>
    </>
  );
};