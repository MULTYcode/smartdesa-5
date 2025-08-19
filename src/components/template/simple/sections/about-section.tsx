import Image from "next/image"
import { CustomButton } from "@/components/ui/simple/CustomButton"
import { ChevronRight } from "lucide-react"
import type { TourSection as AboutSectionType } from "@/types/Simple"
import { useRouter } from "next/navigation"

interface AboutSectionProps {
  data: AboutSectionType
}

export function AboutSection({ data }: AboutSectionProps) {

  const router = useRouter();

  const handleClick = () => {
    router.push('/tour');
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-[#0d6b3f]/10 text-[#0d6b3f] font-medium rounded-full text-sm mb-4">
              {data.description}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.title}</h2>
            {data.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
            <CustomButton className="bg-[#0d6b3f] hover:bg-[#0a5733]" onClick={handleClick}>
              {data.button.text}
              <ChevronRight className="h-4 w-4 ml-1" />
            </CustomButton>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
