import { VideoCarousel } from "./VideoCarousel";

const InstagramSection = () => (
  <section className="py-6 md:py-10 px-1 md:px-2">
    <div className="mt-0 md:mt-0">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          As seen on Instagram
        </h2>
        <VideoCarousel />
        <div className="text-center mt-6">
          <a
            href="https://instagram.com/brownhues.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
            style={{ minWidth: 220, justifyContent: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="7" fill="url(#insta-gradient)"/>
              <defs>
                <linearGradient id="insta-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F58529"/>
                  <stop offset="0.5" stopColor="#DD2A7B"/>
                  <stop offset="1" stopColor="#515BD4"/>
                </linearGradient>
              </defs>
              <path d="M16.98 7.02c-.13-.32-.37-.57-.69-.69-.48-.18-1.62-.14-2.29-.14s-1.81-.04-2.29.14c-.32.13-.57.37-.69.69-.18.48-.14 1.62-.14 2.29s-.04 1.81.14 2.29c.13.32.37.57.69.69.48.18 1.62.14 2.29.14s1.81.04 2.29-.14c.32-.13.57-.37.69-.69.18-.48.14-1.62.14-2.29s.04-1.81-.14-2.29zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2zm4.32-7.68a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0z" fill="#fff"/>
              <circle cx="12" cy="12" r="2.4" fill="#fff"/>
            </svg>
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default InstagramSection;
