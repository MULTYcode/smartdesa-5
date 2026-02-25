"use client"
import Link from 'next/link';
import { validateAndRedirect } from '@/lib/shouldRedirect';
import { redirect, useParams } from 'next/navigation';
import SliderCard from '@/components/shared/sliderImage';
import moment from 'moment';
import 'moment/locale/id';
import DownloadButton from '@/components/shared/DownloadButton';
import usePressReleaseDetail from '@/features/press-release/hooks/useDetail';
import { cleanContent } from '@/components/shared/cleanContent';
import AsideContent from '@/components/template/simple/layout/aside-content';
import RichTextContent from '@/components/common/RichTextContent';
import { BiCalendar } from 'react-icons/bi';
import Image from 'next/image';

export default function Page() {
  const { slug }: { slug: string } = useParams();
  const { data: pressRelease, isLoading } = usePressReleaseDetail({ with: "category,attachments" }, slug);

  try {
    const rawDescription = pressRelease?.content || "";
    const paragraphs = cleanContent(rawDescription);
    const contentImageUrl: { title: string; link: string }[] = [];

    if (pressRelease?.thumbnail) {
      contentImageUrl.push({
        title: "Thumbnail",
        link: pressRelease.thumbnail
      });
    }
    const imgTagMatches = pressRelease?.content?.match(/<img[^>]+src="([^">]+)"/gi) || [];

    imgTagMatches.forEach((imgTag: string, index: number) => {
      const srcMatch = imgTag.match(/src="([^">]+)"/i);
      if (srcMatch && srcMatch[1]) {
        contentImageUrl.push({
          title: `Image ${index + 1} from content`,
          link: srcMatch[1]
        });
      }
    });

    pressRelease?.attachments?.forEach((attachment: { original_name: any; url: any; }, index: number) => {
      contentImageUrl.push({
        title: attachment?.original_name || `Attachment ${index + 1} from content`,
        link: attachment.url
      });
    })

    return (
      <div className="min-h-screen bg-white flex justify-center w-full">
        <div className="w-full px-4 sm:px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <AsideContent>
            {isLoading ? (
              <div className="flex flex-col pr-0 sm:pr-3 my-2 gap-y-2 min-h-screen animate-pulse">
                <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded"></div>
                <div className="h-8 sm:h-10 w-full sm:w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 sm:w-40 bg-gray-200 rounded"></div>
                <div className="relative w-full group mb-6">
                  <div className="h-40 sm:h-52 w-full rounded-xl bg-gray-100"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                  <div className="h-4 w-4/6 bg-gray-100 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pr-0 sm:pr-3 my-2 gap-y-1 min-h-screen">
                <span className="self-start text-xs sm:text-sm font-semibold text-[#CF4647] uppercase tracking-wider">
                  {pressRelease?.category?.name ?? "Siaran Pers"}
                </span>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-start font-bold tracking-tight text-[#2A363B] mb-2 leading-tight">
                  {pressRelease?.title ?? "Artikel Tidak Ditemukan"}
                </h1>

                <div className="flex flex-row justify-start items-center gap-1 mb-4 text-gray-500">
                  <BiCalendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5" />
                  <span className="text-xs sm:text-sm">{moment(pressRelease?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY')}</span>
                </div>

                {pressRelease?.thumbnail && (
                  <div className="relative w-full group mb-6">
                    <Image
                      className="w-full max-h-64 sm:max-h-80 md:max-h-96 rounded-lg shadow-md object-cover"
                      src={pressRelease.thumbnail || "/placeholder.svg"}
                      alt="Press Release Thumbnail"
                      width={1200}
                      height={720}
                      priority
                      style={{
                        aspectRatio: '16/9',
                      }}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                  </div>
                )}

                <div className="prose prose-sm sm:prose-base max-w-none prose-headings:text-[#2A363B] prose-a:text-[#CF4647] prose-a:no-underline hover:prose-a:underline">
                  <RichTextContent content={pressRelease?.content || ""} />
                </div>

                {contentImageUrl.length > 0 && (
                  <div className="mt-6">
                    <SliderCard data={contentImageUrl} slideToShow={3} />
                  </div>
                )}

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="space-y-1 text-gray-600 text-xs sm:text-sm">
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-[#2A363B]">Dinas Kominfo SP Pemkab Muara Enim</p>
                    <p>Website: <a href="https://muaraenimkab.go.id/press-release" className="text-[#CF4647] hover:underline">muaraenimkab.go.id/press-release</a></p>
                    <p>Facebook: Pemkab Muara Enim</p>
                    <p>Instagram: <a href="https://instagram.com/pemkab_muaraenim" className="text-[#CF4647] hover:underline">@pemkab_muaraenim</a></p>
                  </div>
                </div>

                <div className="flex flex-row w-full my-3 gap-1 justify-end">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    <strong className="font-semibold text-[#2A363B]">{pressRelease?.user?.name}</strong>
                  </p>
                </div>

                <DownloadButton article={pressRelease} paragraphs={paragraphs} contentImageUrl={contentImageUrl} />
              </div>
            )}
          </AsideContent>
        </div>
      </div>
    );
  } catch {
    if (validateAndRedirect([slug])) {
      return redirect('/press-release');
    }
    return (
      <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A363B]">404 - Halaman Tidak Ditemukan</h1>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-500">Halaman yang kamu cari tidak ditemukan.</p>
        <Link href="/" className="mt-4 px-6 py-2.5 bg-[#CF4647] text-white rounded-lg hover:bg-[#B93B3C] transition-colors text-sm sm:text-base font-medium">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }
}