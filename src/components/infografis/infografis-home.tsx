import SliderCard from "./sliderInfografis";

export function InfografisSection() {

  
  return (
      <div className="py-4 px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
        <SliderCard slideToShow={4} />
      </div>
  )
}
