"use client"

import "./globals.css";
import Map from "@/components/Map";


export default function Home() {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  return (
    <main>
      <picture>
        <source media="(min-width: 600px)" srcSet="./pattern-bg-desktop.png"/>
        <img src="./pattern-bg-mobile.png" alt="Background image" />
      </picture>
      <div className="map-container">
        <Map apiKey={GOOGLE_MAPS_API_KEY} />
      </div>
    </main>
  );
}
