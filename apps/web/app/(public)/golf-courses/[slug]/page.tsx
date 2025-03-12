import { notFound } from "next/navigation";
import { getCourse } from "@/features/course/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const golfCourse = await getCourse(params.slug);
  if (!golfCourse) {
    notFound();
  }

  // Extract address parts from the address name
  const addressParts = golfCourse.lot_number_address_name.split(" ");
  const region1DepthName = addressParts[0];
  const region2DepthName = addressParts[1];

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-1.5 mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gc">전국</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/gc/${region1DepthName}`}>
                {region1DepthName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {region2DepthName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/gc/${region1DepthName}/${region2DepthName}`}
                  >
                    {region2DepthName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{golfCourse.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">{golfCourse.name}</h1>
      </main>
    </>
  );
}
