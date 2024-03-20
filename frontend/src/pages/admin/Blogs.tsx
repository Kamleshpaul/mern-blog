import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEditIcon, TrashIcon } from "lucide-react";

export default function Blogs() {
  return (
    <>
      <>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Blog Posts</h1>
          <Button className="h-8 ml-auto" variant="outline">
            Add new
          </Button>
        </div>
        <div className="mt-2 border rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img
                    alt="Image"
                    className="object-cover rounded-full"
                    height="40"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                </TableCell>
                <TableCell className="font-medium">Introducing Shadcn UI Components</TableCell>
                <TableCell>Design</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Publish</TableCell>
                <TableCell>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Image"
                    className="object-cover rounded-full"
                    height="40"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                </TableCell>
                <TableCell className="font-medium">Getting Started with Tailwind CSS</TableCell>
                <TableCell>Development</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Draft</TableCell>
                <TableCell>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img
                    alt="Image"
                    className="object-cover rounded-full"
                    height="40"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                </TableCell>
                <TableCell className="font-medium">The Art of Storytelling in Marketing</TableCell>
                <TableCell>Marketing</TableCell>
                <TableCell>Adam Johnson</TableCell>
                <TableCell>Review</TableCell>
                <TableCell>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <FileEditIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button className="w-6 h-6" size="icon" variant="ghost">
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
    </>
  )
}
