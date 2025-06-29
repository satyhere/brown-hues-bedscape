import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
]

export function VideoCarousel() {
  const [emblaApi, setEmblaApi] = React.useState<CarouselApi | null>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (!emblaApi) return
    // Clear any previous interval
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext()
      }
    }, 6000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [emblaApi])

  return (
    <Carousel
      setApi={setEmblaApi}
      className="w-full relative"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {videos.map((videoSrc, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
                <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg overflow-hidden">
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Navigation arrows */}
      <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  )
}

