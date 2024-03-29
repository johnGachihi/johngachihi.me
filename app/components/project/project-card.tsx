import clsx from "clsx";
import React, { useMemo, useRef, useState } from "react";
import type { ProjectSummary } from "~/models/project.server";
import style from "./project-card.css";
import { mdiVolumeHigh, mdiVolumeOff } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "@remix-run/react";
import VideoPlayer from "../post/video-player";

export function links() {
  return [{ rel: "stylesheet", href: style }]
}

export const BaseProjectCard = React.forwardRef(function BaseProjectCard(
  {
    project,
    onSpotlight,
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
  }: {
    project: ProjectSummary,
    onSpotlight: boolean,
    className?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void,
  },
  ref: React.ForwardedRef<any>
) {
  const [isHovered, setIsHovered] = useState(false)

  const [videoWatchProgress, setVideoWatchProgress] = useState(0);

  // TODO: Is this necessary?
  const videoProgressUrlQuery = useMemo(() =>
    videoWatchProgress > /* TODO: Eeh? */ 7 ? `?v=${videoWatchProgress}` : undefined,
    [videoWatchProgress])

  return (
    <Link
      to={{ pathname: project.slug, search: videoProgressUrlQuery }}
      className={clsx("group", className)}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
      ref={ref}
      {...props}
    >
      <div className={clsx(
        "aspect-video transition duration-300",
        { "shadow-[8px_8px_#242424] lg:shadow-[10px_10px_#242424] border border-gray-200": onSpotlight },
      )}>
        {"image" in project.showcaseMedia
          ? (
            <img
              className="w-full h-full object-cover rounded-[inherit]"
              src={project.showcaseMedia.image}
              alt={project.title} />
          )
          : (
            <VideoThumbnail
              src={project.showcaseMedia.muxVideoPlaybackId}
              title={project.title}
              id={project.slug}
              shouldPlay={onSpotlight}
              isCardHovered={isHovered}
              onTimeUpdate={(time) => setVideoWatchProgress(time)}
            />
          )
        }
      </div>

      <div className="px-2 pt-4 pb-4">
        <div className="caption lg:body2">{project.startedAt}</div>
        <div className="body1 lg:h6 font-medium">{project.title}</div>
        {project.tags && (
          <div className="flex flex-wrap mt-2">
            {project.tags.map((tag) => (
              <div className="caption lg:body2 text-gray-500 mr-2" children={"#" + tag} key={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
})

export function SpotlightOnLongHoverProjectCard({ ...props }: { project: ProjectSummary, className?: string }) {
  const { isLongHovered, ...hoverCallbacks } = useLongHover();

  return (
    <BaseProjectCard
      {...props}
      {...hoverCallbacks}
      onSpotlight={isLongHovered}
    />
  )
}

function useLongHover() {
  const [isLongHovered, setIsLongHovered] = useState(false);
  const timeoutRef = useRef<any>(null);

  const onMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsLongHovered(true);
    }, 2000);
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsLongHovered(false);
  };

  return { isLongHovered, onMouseEnter, onMouseLeave };
}

function VideoThumbnail({ src, title, id, shouldPlay, isCardHovered, onTimeUpdate }: {
  src: string,
  title: string,
  id: string,
  shouldPlay: boolean,
  isCardHovered: boolean,
  onTimeUpdate: (time: number) => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handleTimeUpdate = debounce((time: number) => {
    onTimeUpdate(time)
  }, 500)

  return (
    <div className={clsx("relative w-full h-full rounded-[inherit]")}>
      <div className="absolute inset-0 flex flex-col justify-between items-end p-2 z-10">
        <div
          className={clsx(
            { "opacity-0 invisible": !isPlaying },
            "visible bg-gray-600/40 hover:bg-gray-600/75 p-1.5 rounded transition duration-300"
          )}
        >
          <div
            onClick={(e) => {
              setIsMuted(isMuted => !isMuted);
              e.preventDefault();
            }}
            title={isMuted ? "Unmute" : "Mute"}
            className="text-white"
          >
            {isMuted
              ? <Icon path={mdiVolumeHigh} size={1} />
              : <Icon path={mdiVolumeOff} size={1} />
            }
          </div>
        </div>

        <div className={clsx(
          "text-xs text-white bg-gray-600/75 p-1 rounded transition duration-300",
          isPlaying ? "opacity-0 invisible" : "opacity-100 visible",
        )}>
          <span className="hidden lg:block">
            {isCardHovered ? "Keep hovering to play" : "Video"}
          </span>
          <span className="lg:hidden">Video</span>
        </div>
      </div>

      <VideoPlayer
        className="absolute inset-0 rounded-[inherit] overflow-clip"
        src={src}
        shouldPlay={shouldPlay}
        isMuted={isMuted}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        meta={{ id, title }}
      />
    </div>
  )
}

function debounce(fn: (time: number) => void, ms: number) {
  let isDebouncing = false;
  let lastCallArg: number | null = null;

  const f = (time: number) => {
    if (!isDebouncing) {
      fn(time);

      isDebouncing = true;

      setTimeout(() => {
        isDebouncing = false;
        if (lastCallArg) {
          f(lastCallArg);
          lastCallArg = null;
        }
      }, ms);
    } else {
      lastCallArg = time;
    }
  }

  return f;
}