import { Instagram, Play } from "lucide-react";

const REEL_URLS = [
  "https://www.instagram.com/reel/DN6CAaQjdIx/?igsh=MTB0NG95dGV3bjhwbQ==",
  "https://www.instagram.com/p/DL-W3VWouIh/?igsh=MXhvemFzMXV1ang5aQ==",
  "https://www.instagram.com/reel/DCE31-fO72k/?igsh=anZxanUxdnpuOGJk",
  "https://www.instagram.com/reel/DJ4KGjLI5Z-/?igsh=cnlodWo3MHg5cndi",
];

export function InstagramFeed() {
  return (
    <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start">
        <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724]">Bethema socials</h2>
        <a
          href="https://www.instagram.com/BethemaSkin/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-[#2b2724] mt-1"
        >
          @bethemaskin
          <Instagram className="w-5 h-5" />
        </a>

        <div className="flex gap-2 overflow-x-auto pb-2 mt-4 w-full no-scrollbar">
          {REEL_URLS.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 w-[139px] h-[180px] bg-[#ececea] flex items-center justify-center group"
            >
              <span className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-[#2b2724] fill-[#2b2724] ml-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
