import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import queryString from "query-string";

export const SearchInput = () => {

  const router = useRouter()

  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  useEffect(() => {
    const url = queryString.stringifyUrl({
      url: "/",
      query: {
        search: debouncedValue,         
      },
    },{ skipEmptyString: true, skipNull: true});

    router.push(url)
  }, [debouncedValue, router])

  return (
    <div className="w-full relative ">
      <Search 
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4 "
      />
      <Input
        className="w-full max-w-[416px] pl-9 h-[40px] bg-stone-100 border-neutral-300 border-[1px] rounded-lg focus:ring-1 hover:ring-1 ring-gray-200"
        placeholder="Search events"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
};
