import Image from "next/image"
import { CustomButton } from "@/components/ui/simple/CustomButton"
import { ChevronRight } from "lucide-react"
import type { TourSection as TourSectionType } from "@/types/Simple"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface TourSectionProps {
  data: TourSectionType
}

export function TourSection({ data }: TourSectionProps) {
  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.2, 
      },
    },
  };

  const router = useRouter();

  const handleClick = () => {
    router.push('/tour');
  };

  return (
    <section className="py-8 flex justify-center">
      <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-10 items-center">
          <motion.div
            className="relative aspect-[3/2]"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title || "Tour Image"}
              fill
              className="object-cover object-center rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="inline-block px-3 py-1 bg-[#CF4647]/10 text-[#CF4647] font-medium rounded-full text-sm mb-4">
              {data.title}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.subTittle}</h2>
            {data.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
            <CustomButton className="bg-[#F5D061] hover:bg-[#F5D061]" onClick={handleClick}>
              {data.button.text}
              <ChevronRight className="h-4 w-4 ml-1" />
            </CustomButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}