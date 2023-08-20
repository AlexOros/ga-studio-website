import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const { locale } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, [locale]);

  return [searchQuery, setSearchQuery] as const;
};
