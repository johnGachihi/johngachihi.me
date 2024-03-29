import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration, useCatch, useLocation, useTransition
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import vendorStyles from "./styles/vendor.css";
import { AppBar } from "~/components/AppBar";
import Button from "~/components/button";
import { Snackbar } from "~/components/snackbar";
import { CircleLoader } from "~/components/circle-loader";
import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";


export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: vendorStyles },
    { rel: "stylesheet", href: tailwindStylesheetUrl },

    // Google font
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png"
    },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "icon", href: "/favicon.ico" }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "John Gachihi",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": "#000",
});

const Fathom = () => {
  const location = useLocation();

  useEffect(() => load("RGSIUMNB", {
    url: "https://fresh-fortunate.johngachihi.me/script.js"
  }), []);

  useEffect(() => {
    trackPageview();
  }, [location.pathname, location.search]);

  return null;
};

function PageLoadingMessage() {
  const transition = useTransition();

  return (
    <Snackbar open={transition.state === "loading"}>
      <div className="flex items-center gap-x-4">
        <CircleLoader color="onPrimary" />
        Page loading...
      </div>
    </Snackbar>
  );
}

export default function App() {
  return (
    <html lang="en" className="h-full">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="h-full">
    <Outlet />
    <PageLoadingMessage />

    <ScrollRestoration />
    <Scripts />
    <LiveReload />

    <Fathom />
    </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en" className="h-full">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="flex flex-col h-full">
    <AppBar />
    <main className="w-4/5 mx-auto grow flex flex-col items-center justify-center text-center">
      <span className="text-5xl text-red-800 max-w-2xl mb-10">Ayaya! Something's wrong here</span>
      <Link to="/">
        <Button variant="outlined">Back to Home?</Button>
      </Link>
    </main>
    <Scripts />
    </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();

  if (caught.status === 404)
    return (
      <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full">
      <AppBar />
      <main className="w-4/5 mx-auto grow flex flex-col items-center justify-center text-center">
        <span className="text-5xl mb-4">404</span>
        <span className="text-xl mb-1">This path does not exist </span>
        <span className="text-xl max-w-full truncate">{location.pathname}</span>
      </main>
      <Scripts />
      </body>
      </html>
    );
}