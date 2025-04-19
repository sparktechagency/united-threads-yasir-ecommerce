import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MobileSidebar = ({ open, setOpen, links }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="sr-only">Open Mobile Navigation Menu</SheetTitle>
      <SheetContent side="left" className="px-4 py-14 md:hidden">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.route}
            className="flex-center-between border-b pb-1 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
            onClick={() => setOpen(false)}
          >
            {link.label}

            <ArrowRight className="text-gray-600 hover:text-black" />
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
