/**
 * Abhiara Foundation, Gallery Page
 * Dedicated media gallery. clean grid of all photos and videos.
 * Data sourced from client/src/data/gallery-data.ts (edit in GitHub to add new media).
 */
import { useEffect, useState } from "react";
import { Camera, MapPin, Calendar, X, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery-data";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.type === filter);

  const photoCount = GALLERY_ITEMS.filter((i) => i.type === "photo").length;
  const videoCount = GALLERY_ITEMS.filter((i) => i.type === "video").length;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#FAFAFA]">
        <div className="container text-center">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-4">
              OUR JOURNEY IN FRAMES
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4">
              Gallery
            </h1>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto mb-6" />
            <p className="font-sans text-[17px] text-[#555] max-w-lg mx-auto">
              Every photo tells a story. Every visit leaves a mark. Here is our work. unfiltered, on the ground, real.
            </p>
          </AnimatedSection>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setFilter("all")}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                filter === "all"
                  ? "border-[#F5A623] text-[#F5A623]"
                  : "border-gray-200 text-[#666] hover:border-gray-300"
              }`}
            >
              All ({GALLERY_ITEMS.length})
            </button>
            <button
              onClick={() => setFilter("photo")}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                filter === "photo"
                  ? "border-[#F5A623] text-[#F5A623]"
                  : "border-gray-200 text-[#666] hover:border-gray-300"
              }`}
            >
              Photos ({photoCount})
            </button>
            <button
              onClick={() => setFilter("video")}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                filter === "video"
                  ? "border-[#F5A623] text-[#F5A623]"
                  : "border-gray-200 text-[#666] hover:border-gray-300"
              }`}
            >
              Videos ({videoCount})
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 bg-[#FAFAFA]">
        <div className="container">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 0.03}>
                <div
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.type === "photo" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto object-contain bg-[#F4F0E8]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative aspect-video bg-black/50">
                      <img
                        src={item.thumbnail || item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#F5A623]/90 flex items-center justify-center">
                          <Play size={24} className="text-[#1A1A1A] ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="font-serif text-sm font-bold text-white mb-1">{item.title}</p>
                    {item.location && (
                      <p className="font-mono text-[9px] tracking-wider text-[#555] flex items-center gap-1">
                        <MapPin size={10} /> {item.location}
                      </p>
                    )}
                    {item.date && (
                      <p className="font-mono text-[9px] tracking-wider text-[#555] flex items-center gap-1 mt-1">
                        <Calendar size={10} /> {item.date}
                      </p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera size={48} className="text-[#888] mx-auto mb-4" />
              <p className="font-sans text-[#888]">No items to display. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 text-[#555] hover:text-white z-50"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "photo" ? (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-sm"
              />
            ) : (
              <div className="w-full aspect-video">
                <video
                  src={selectedItem.src}
                  className="w-full h-full rounded-sm"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            )}

            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg font-bold text-white mb-2">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="font-sans text-sm text-[#555] max-w-xl mb-2">{selectedItem.description}</p>
              )}
              <div className="flex items-center justify-center gap-4 text-[#888]">
                {selectedItem.location && (
                  <span className="font-mono text-[10px] tracking-wider flex items-center gap-1">
                    <MapPin size={11} /> {selectedItem.location}
                  </span>
                )}
                {selectedItem.date && (
                  <span className="font-mono text-[10px] tracking-wider flex items-center gap-1">
                    <Calendar size={11} /> {selectedItem.date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
