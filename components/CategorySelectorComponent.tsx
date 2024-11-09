"use client";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";


interface CategorySelectorProps {
	categories: Category[];
}
const CategorySelectorComponent = ({
	categories
}: CategorySelectorProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const router = useRouter();

    return (
         <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
                    className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded"
                >
                    
          {value
            ? categories.find((cat) => cat._id === value)?.title
            : "Filter by category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
                    <CommandInput placeholder="Search category..."
                        className="h-9"
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                const selectedCategory = categories.find((cat) => cat.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                                if (selectedCategory?.slug?.current) {
                                    setValue(selectedCategory._id) 
                                    router.push(`/categories/${selectedCategory.slug.current}`)
                                    setOpen(false)
                                }
                           }
                        }}
                    />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((cat) => (
                <CommandItem
                  key={cat._id}
                  value={cat.title}
                  onSelect={() => {
                      setValue(value === cat._id ? "" : cat._id)
                      router.push(`/categories/${cat.slug?.current}`)
                    setOpen(false)
                  }}
                >
                  {cat.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
};

export default CategorySelectorComponent;
