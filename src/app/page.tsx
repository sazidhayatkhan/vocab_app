import SwipeCard from "@/components/ui/Cards/SwipeCard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SwipeCard
        word="Paucity"
        definition="the presence of something in only small or insufficient quantities or amounts."
        translation="অভাব, অনটন, অল্পতা, পরিমাণে স্বল্পতা"
      />
    </div>
  );
};

export default page;
