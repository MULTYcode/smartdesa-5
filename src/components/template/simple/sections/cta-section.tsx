import { CustomButton } from "@/components/ui/simple/CustomButton"
import { Mail, Phone } from "lucide-react"
import type { CTASection as CTASectionType } from "@/types/Simple"

interface CTASectionProps {
  data: CTASectionType
}

export function CTASection({ data }: CTASectionProps) {
  // Function to render the correct icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "phone":
        return <Phone className="h-4 w-4 mr-2" />
      case "mail":
        return <Mail className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <section className="py-8 bg-[#0d6b3f]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{data.title}</h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">{data.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButton className="bg-white text-[#0d6b3f] hover:bg-gray-100" onClick={() => window.open(data.buttons.primary.url, '_blank')}>            
            {renderIcon(data.buttons.primary.icon)}
            {data.buttons.primary.text}
          </CustomButton>
          <CustomButton variant="outline" className="border-white text-white hover:bg-white/20" onClick={() => window.open(data.buttons.secondary.url, '_blank')}>
            {renderIcon(data.buttons.secondary.icon)}
            {data.buttons.secondary.text}
          </CustomButton>
        </div>
      </div>
    </section>
  )
}
