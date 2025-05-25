import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostCategory } from "@prisma/client";
import { getCategories } from "./actions";

interface PostCategorySelectProps {
  onChange: (value: string) => void;
  value: string;
}

export default async function PostCategorySelect({ onChange, value }: PostCategorySelectProps) {
  const [categoriesData, error] = await getCategories();

  const categories: PostCategory[] = categoriesData || [];

  if (error) {
    console.log(error);
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
