/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/ui/navigation-menu';

import { cn } from '~/lib/utils';

const Navigation = () => {
  return (
    <NavigationMenu className='hidden sm:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <div className='flex flex-col'>
                    <img
                      src='https://img.freepik.com/free-photo/futuristic-school-classroom-future-students_23-2150906106.jpg?t=st=1706812152~exp=1706815752~hmac=8b3dadf318ffde525d41808550a2cef0d7519885f95999d7556f7d25ac0e04ea&w=1800'
                      alt='About'
                      className='h-48 w-full rounded-md object-cover'
                    />
                    <div className='mt-2 flex flex-col gap-0'>
                      <div className='text-lg font-semibold'>Tech Conclave</div>
                      <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                        Largest in North-east India.
                      </p>
                    </div>
                  </div>
                </NavigationMenuLink>
              </li>

              <ListItem href='/about' title='About Techfest'>
                Techfest is the annual science and technology festival of NIT
                Agartala. Started in 2016, it is the largest technical festival
                in North-east India.
              </ListItem>
              <ListItem href='/team' title='Team'>
                Meet the team behind Techfest. We are a group of passionate and
                dedicated students who work hard to make Techfest a success.
              </ListItem>
              <ListItem href='/sponsors' title='Sponsors'>
                Techfest is made possible by the generous support of our
                sponsors. We are grateful for their support.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/buy-tickets' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Buy Tickets
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-100',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default Navigation;
