import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CircleEllipsisIcon, HeartIcon, LayersIcon, TextIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClassAttributes, HTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"
import { ResponsiveLine } from "@nivo/line"
import { Badge } from "@/components/ui/badge"



export default function Dashboard() {
  return (
    <div className="p-8 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back! 👋</h1>
          <p className="text-sm text-gray-500">Good evening!</p>
        </div>
      </div>


      <section className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">


        <Card className="flex items-center bg-blue-200/50">

          <CardContent className="w-full p-6">
            <Avatar>
              <AvatarImage alt="Henry Qells" src="/placeholder." />
              <AvatarFallback>HQ</AvatarFallback>
            </Avatar>
            <h2 className="mt-3 text-lg font-semibold">Henry Qells</h2>
            <p className="text-sm text-gray-500">Writer/Author</p>

            <div className="flex justify-between mt-4">
              <div>
                <p className="text-lg font-semibold">32</p>
                <p className="text-sm text-gray-500">Total Post</p>
              </div>
              <div>
                <p className="text-lg font-semibold">23K</p>
                <p className="text-sm text-gray-500">Subscriber</p>
              </div>
            </div>
          </CardContent>

        </Card>


        <div className="grid grid-cols-1 col-span-3 gap-6 md:grid-cols-3">

          <Card className="bg-blue-200/50">
            <CardContent className="p-6">
              <TextIcon className="text-blue-500" />
              <p className="mt-3 text-lg font-semibold">154</p>
              <p className="text-sm text-gray-500">Total Post</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200/50">
            <CardContent className="p-6">
              <LayersIcon className="text-blue-500" />
              <p className="mt-3 text-lg font-semibold">56</p>
              <p className="text-sm text-gray-500">Total Pages</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200/50">
            <CardContent className="p-6">
              <CircleEllipsisIcon className="text-blue-500" />
              <p className="mt-3 text-lg font-semibold">34,267</p>
              <p className="text-sm text-gray-500">Comments</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200/50">
            <CardContent className="p-6">
              <HeartIcon className="text-red-500" />
              <p className="mt-3 text-lg font-semibold">65.26K</p>
              <p className="text-sm text-gray-500">Total Likes</p>
            </CardContent>
          </Card>
        </div>
      </section>


      <section className="grid grid-cols-1 gap-3 mb-3 md:grid-cols-3 md:gap-6 md:mb-6">
        <div className="col-span-2">
          <Card className="bg-blue-200/50">
            <CardHeader>
              <CardTitle>Visitors</CardTitle>
              <div className="flex items-center">
                <p className="text-lg font-semibold">250K</p>
                <p className="ml-2 text-sm text-gray-500">New Visitors</p>
                <Badge className="ml-4">
                  2.5% Visitors Increase
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart className="w-full h-[300px]" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="bg-blue-200/50">
            <CardHeader>
              <CardTitle>Recent Blogs</CardTitle>
              <Button className="ml-auto" variant="secondary">
                + Add New
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full h-72">
                <ul className="space-y-4">
                  <li>
                    <h3 className="text-sm font-semibold">Clever Ways to Celebrate Christmas...</h3>
                    <p className="text-xs text-gray-500">35 Comments · 964 Views · Edit</p>
                  </li>
                  <li>
                    <h3 className="text-sm font-semibold">Setting Intentions Instead of Resolutions...</h3>
                    <p className="text-xs text-gray-500">25 Comments · 566 Views · Edit</p>
                  </li>
                  <li>
                    <h3 className="text-sm font-semibold">Physical Development Activities for...</h3>
                    <p className="text-xs text-gray-500">35 Comments · 156 Views · Edit</p>
                  </li>
                  <li>
                    <h3 className="text-sm font-semibold">Liki Trike - A Compact Trike with the Big...</h3>
                    <p className="text-xs text-gray-500">54 Comments · 918 Views · Edit</p>
                  </li>
                  <li>
                    <h3 className="text-sm font-semibold">How Doona and Liki Make For The Perfe...</h3>
                    <p className="text-xs text-gray-500">67 Comments · 480 Views · Edit</p>
                  </li>
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}


function LineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}