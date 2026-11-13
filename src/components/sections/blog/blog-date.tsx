export function BlogDate({ date, dateIso }: { date: string; dateIso: string }) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  const label = match
    ? `${match[3]}/${match[2]}/${match[1]}`
    : new Intl.DateTimeFormat("en-GB").format(new Date(date));

  return (
    <time className="r-blog-date" dateTime={dateIso}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18" />
      </svg>
      {label}
    </time>
  );
}
