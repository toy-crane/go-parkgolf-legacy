import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbTrail {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  trail: BreadcrumbTrail[];
  className?: string;
}

export function Breadcrumbs({ trail, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {trail.map((item, index) => (
          <React.Fragment key={item.href || item.label}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-bold underline underline-offset-4">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < trail.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
