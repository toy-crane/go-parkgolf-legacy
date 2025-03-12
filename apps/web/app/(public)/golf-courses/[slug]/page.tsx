import { notFound } from "next/navigation";
import { getCourse } from "@/features/course/actions";
import { Breadcrumbs } from "@/components/breadcrumbs";

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

  const breadcrumbTrail = [
    { href: "/gc", label: "전국" },
    { href: `/gc/${region1DepthName}`, label: region1DepthName },
    ...(region2DepthName
      ? [
          {
            href: `/gc/${region1DepthName}/${region2DepthName}`,
            label: region2DepthName,
          },
        ]
      : []),
    { label: golfCourse.name },
  ];

  return (
    <>
      <main className="container mx-auto px-4 py-4">
        <Breadcrumbs trail={breadcrumbTrail} className="mb-1.5" />
        <h1 className="text-3xl font-bold">{golfCourse.name}</h1>
      </main>
    </>
  );
}
