import { formatMetadata } from '@/lib/generate-seo'
import ArticleDetail from '@/features/article/components/articleDetail'
import { getArticle } from '@/features/article/libs/getArticle';
import { Metadata } from 'next';
import SettingService from '@/shared/services/setting.service';
import Link from 'next/link';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps ): Promise<Metadata> {
  const { slug } = await params;
  try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    const article = await getArticle(slug);
    return formatMetadata({ ...article, type: "article" }, { siteName: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim" });
  } catch {
    return {
      title: `Artikel | Pemerintah Kabupaten Muara Enim`,
    };
  }
}

export default async function Page({ params }: PageProps ) {
  const { slug } = await params;
   try {
    const article = await getArticle(slug);
    return  <div className="min-h-screen flex justify-center w-full">
       <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <ArticleDetail slug={slug} article={article} />
      </div>
    </div>;
  } catch {
    return <div className="min-h-screen flex justify-center w-full">
       <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
           <div className="flex flex-col text-center items-center justify-center h-96 w-full text-gray-700">
              <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              <p className="mt-2 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
              <Link href="/" className="mt-4 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
                Kembali ke Beranda
              </Link>
            </div>
      </div>
    </div> 

  }
}