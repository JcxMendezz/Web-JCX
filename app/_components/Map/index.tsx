"use client";

import cn from "classnames";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./styles.module.scss";

export const Map = () => {
  const { theme } = useTheme();
  const [mouseEntered, setMouseEntered] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(13.78);
  const mapRef = useRef<HTMLDivElement>(null);

  const mapStyle = 'dark-v10';
    //theme === "dark"
     // ? "clyyz85z301b301qo45htab6c" // Estilo oscuro
     // : "clytc9cvd006f01qo3u716sxy"; // Estilo claro

  const accessToken =
    "pk.eyJ1IjoiamN4bWVuZGV6IiwiYSI6ImNseXh3MzAzZzA3dGsybXB2dDR3aTBvcjYifQ.88iK8r_Y5rJsDNFcGw7VBQ";

  const handleZoom = useCallback(
    (type: "in" | "out") => {
      const zoomChange = type === "in" ? 4 : -4;
      map?.flyTo({ zoom: zoom + zoomChange });
      setZoom((prev) => prev + zoomChange);
    },
    [map, zoom]
  );

  const handleMouseEnter = useCallback(() => setMouseEntered(true), []);
  const handleMouseLeave = useCallback(() => setMouseEntered(false), []);

  useEffect(() => {
    if (!mapRef.current) return;

    const timer = setTimeout(() => {
      mapboxgl.accessToken = accessToken;

      const newMap = new mapboxgl.Map({
        container: mapRef.current as HTMLDivElement,
        style: `mapbox://styles/jcxmendez/${mapStyle}`,
        center: [-73.60742, 4.14003],
        zoom: zoom,
        bearing: 246.4, // Añadido según el enlace proporcionado
        pitch: 22, // Añadido según el enlace proporcionado
        dragPan: false,
        scrollZoom: false,
        dragRotate: false,
        boxZoom: false,
        doubleClickZoom: false,
        attributionControl: false,
        trackResize: false,
        collectResourceTiming: false,
      });

      setMap(newMap);

      return () => newMap.remove();
    }, 750);

    return () => clearTimeout(timer);
  }, [mapStyle, zoom, accessToken, theme]);

  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/-73.60742,4.14003,${zoom}/300x200?access_token=${accessToken}`;

  return (
    <div
      className={cn(styles.container)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(styles.static)}
        style={{
          backgroundImage: `url("${mapImageUrl}")`,
        }}
      />
      <div ref={mapRef} className={cn(styles.mapContainer)}></div>
      <motion.div
        className={cn(styles.marker)}
        animate={{
          scale: mouseEntered ? 1.1 : 1,
        }}
        transition={{
          ease: [0.85, 0, 0.3, 1],
          duration: 0.5,
        }}
      >
        <motion.div
          className={cn(styles.memojiWrapper)}
          animate={{
            scale: mouseEntered ? [1, 1.2, 1, 1.2, 1] : 1,
            rotate: mouseEntered ? [0, 15, 0, -15, 0] : 1,
          }}
          transition={{
            repeat: mouseEntered ? Infinity : 0,
            duration: mouseEntered ? 1.6 : 0.5,
          }}
        >
          <Image
            alt=""
            className={cn(styles.memoji)}
            width={50}
            height={50}
            src="/images/globe.png"
          />
        </motion.div>
      </motion.div>
      {zoom > 4 && (
        <motion.div
          key="out"
          className={cn(styles.zoomButton)}
          style={{ left: 14 }}
          onClick={() => handleZoom("out")}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.25, delay: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0,0H24V24H0Z" fill="none" />
            <path
              d="M16,12H8"
              fill="none"
              stroke="var(--icon)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      )}
      {zoom < 12 && (
        <motion.div
          key="in"
          className={cn(styles.zoomButton)}
          style={{ right: 14 }}
          onClick={() => handleZoom("in")}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.25, delay: 1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0,0H24V24H0Z" fill="none" />
            <path
              d="M12,8v8M16,12H8"
              fill="none"
              stroke="var(--icon)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
};
