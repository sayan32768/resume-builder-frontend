"use client";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const logos = [
  "/logos/tiktok.png",
  "/logos/linkedin.png",
  "/logos/twitter.png",
  "/logos/discord.png",
];

const Slider = () => (
  <div className="flex size-full items-center justify-center bg-background">
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {logos.map((logo, index) => (
          <MarqueeItem
            key={index}
            className="h-auto max-md:w-[10vw] md:w-[70px] mx-[3vw] max-md:my-2"
          >
            <img alt={`Placeholder`} className="overflow-hidden" src={logo} />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  </div>
);
export default Slider;
