"use client"
import Link from "next/link";
import Image from "next/image";
import useSetting from "@/hooks/useSettings";
import Refetch from "./refetch";

export default function Logo({isDark}: { isDark?: boolean }) {
  const { data: logo, isLoading, refetch, isFetching, isError } = useSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  
  return ( 
    <>
      {   
          isLoading ? (
            <>
               <div>
                      <div className="h-10 w-10 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                    <div>
                      <div className="h-6 w-40 bg-gray-300 animate-pulse rounded"></div>
                    </div>
            </>
          ) : isError && !isFetching  ? (
            <Refetch refetch={refetch} />
          ) : (
              <>       
                 <Link href="/" className="flex flex-row py-1 justify-center items-center space-x-3 rtl:space-x-reverse rounded-md lg:hover:scale-95 transition transform duration-300 ease-in-out">
                    <div className="flex items-center space-x-1 sm:space-x-3">
                      <Image
                          className="h-1"
                          src={logo?.value?.imageUrl ?? '/images/download.png'}
                          alt="Logo"
                          width={500}
                          height={300}
                          style={{
                            width: "38px",
                            height: "auto",
                          }}
                        />
                        <div className="flex flex-col justify-center">
                            <h1 className={`font-bold text-sm sm:text-lg leading-5 ${isDark ? 'text-[#F7C873]' : 'text-[#D97706]'}`}>{logo?.value?.regionEntity ?? "[Judul logo belum diatur]"}</h1>
                            <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{logo?.value?.regionDescription ?? "[Sub judul logo belum diatur]"}</p>
                          </div>
                      </div>
                  </Link>
              </>
          )
      }
    </>
    
  );
}