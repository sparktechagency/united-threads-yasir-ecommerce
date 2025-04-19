import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";

const MobileSidebar = ({
  open,
  setOpen,
  setShowDownloadCatalogModal,
  links,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="sr-only">Open Mobile Navigation Menu</SheetTitle>
      <SheetContent side="left" className="space-y-4 px-4 py-14 md:hidden">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.route}
            className="flex-center-between border-b pb-1 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
            onClick={() => setOpen(false)}
          >
            {link.label}

            <ArrowRight size={16} className="text-gray-600 hover:text-black" />
          </Link>
        ))}

        <Button
          size="sm"
          className="primary-button !mt-6 rounded-lg"
          onClick={() => {
            setShowDownloadCatalogModal(true);
            setOpen(false);
          }}
        >
          <DownloadIcon size={18} />
          Download Catalog
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
