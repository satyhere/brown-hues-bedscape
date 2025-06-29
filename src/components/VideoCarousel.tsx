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
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([])
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Handle embla initialization and slide change events
  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap()
      setActiveIndex(newIndex)
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  // Auto-advance carousel
  React.useEffect(() => {
    if (!emblaApi) return
    
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

  // Pause all videos except the active one
  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      
      if (index === activeIndex) {
        video.play().catch(e => console.log("Auto-play prevented", e))
      } else {
        video.pause()
      }
    })
  }, [activeIndex])

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
                  ref={el => videoRefs.current[index] = el}
                  src={videoSrc}
                  autoPlay={index === 0}
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
