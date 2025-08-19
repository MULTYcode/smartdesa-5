import RichTextContent from "@/components/common/RichTextContent"

interface WellcomeSectionProps {
  data: string
}

export function SambutanSection({ data }: WellcomeSectionProps) {

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="items-center">
          <RichTextContent
            content={data}
            className="px-4 py-4 md:px-16"
          />
        </div>
      </div>
    </section>
  )
}
