import CustomTShirtDesigner from "@/components/CustomTShirtDesigner/CustomTShirtDesigner";
import CustomTShirtDesigner2 from "@/components/CustomTShirtDesigner/CustomTShirtDesigner2";

export const metadata = {
  title: "Design Your Apparel",
  description: "Custom apparel designer  page",
};

export default function DynamicProductPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <CustomTShirtDesigner />
      {/* <CustomTShirtDesigner2 /> */}
    </div>
  );
}
