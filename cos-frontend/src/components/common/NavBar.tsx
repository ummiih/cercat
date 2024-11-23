import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { MENU_LIST } from '@/utils/common/nav';

export default function NavBar() {
  const paramsName = usePathname();

  return (
    <nav className="fixed bottom-0 flex w-full justify-center rounded-t-[32px] items-center gap-[0.8rem] pb-[2rem] pt-[0.8rem] bg-white drop-shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      {MENU_LIST.map((menu) => {
        return (
          <Link href={menu.path} key={menu.id} className="w-[4rem] flex flex-col justify-center items-center">
            {'/' + paramsName.split('/')[1] === menu.path ? <menu.ClickedIcon /> : <menu.Icon />}
            <span className="whitespace-nowrap text-h7 text-gray4">{menu.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
