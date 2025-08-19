// components/common/skeletons/TourPageSkeleton.tsx

import React from "react";
import { CardSkeleton } from "./CardSkeleton";
export default function TourPageSkeleton() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
