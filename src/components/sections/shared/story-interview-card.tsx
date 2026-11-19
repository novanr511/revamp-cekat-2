"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type StoryInterviewCardProps = {
  videoId: string;
  image: string;
  company: string;
  name: string;
  role: string;
  watchLabel: string;
  closeLabel: string;
  fallbackLabel: string;
  loadingLabel: string;
  featured?: boolean;
  headline?: string;
};

/** Photo-led editorial cards; the interview only loads after an explicit action. */
export function StoryInterviewCard({
  videoId,
  image,
  company,
  name,
  role,
  watchLabel,
  closeLabel,
  fallbackLabel,
  loadingLabel,
  featured = false,
  headline,
}: StoryInterviewCardProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  function openInterview() {
    setLoaded(false);
    setPlaying(true);
    dialog.current?.showModal();
  }

  return (
    <article
      className={`story-interview${featured ? " story-interview--featured" : ""}`}
    >
      <button
        type="button"
        className="story-interview__media"
        onClick={openInterview}
        aria-label={`${watchLabel}: ${company}`}
      >
        {!imageFailed && (
          <Image
            src={
              featured
                ? image
                : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            }
            alt={featured ? name : `${name}, ${company}`}
            fill
            sizes={
              featured
                ? "(min-width: 768px) 60vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            priority={featured}
            fetchPriority={featured ? "high" : undefined}
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <span className="story-interview__image-fallback">{company}</span>
        )}
        <span className="story-interview__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M8 4.5v15l12-7.5z" />
          </svg>
        </span>
      </button>
      <div className="story-interview__copy">
        {headline ? (
          <>
            <p className="story-interview__company">{company}</p>
            <h3>{headline}</h3>
          </>
        ) : (
          <h3>{company}</h3>
        )}
        <p className="story-interview__person">{name}</p>
        <p className="story-interview__role">{role}</p>
        <button
          type="button"
          className="story-interview__watch"
          onClick={openInterview}
        >
          {watchLabel}
        </button>
      </div>
      <dialog
        ref={dialog}
        className="story-interview-dialog"
        aria-label={`${watchLabel}: ${company}`}
        data-lenis-prevent
        onClose={() => setPlaying(false)}
      >
        <div className="story-interview-dialog__header">
          <p>{company}</p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            {closeLabel}
          </button>
        </div>
        <div
          className="story-interview-dialog__video"
          aria-busy={playing && !loaded}
        >
          {playing && !loaded && <p role="status">{loadingLabel}</p>}
          {playing && (
            <iframe
              title={`${watchLabel}: ${company}`}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
              width="960"
              height="540"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {fallbackLabel}
        </a>
      </dialog>
    </article>
  );
}
