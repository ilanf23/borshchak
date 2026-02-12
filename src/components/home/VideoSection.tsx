import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const VideoSection = () => {
  const videoAnim = useScrollAnimation(0.1, "scale");

  return (
    <section className="section-padding-sm bg-background">
      <div className="container">
        <div
          ref={videoAnim.ref}
          className={`max-w-4xl mx-auto ${videoAnim.className}`}
        >
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/lN_avUAmYnk"
              title="Borshchak Law Group"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
