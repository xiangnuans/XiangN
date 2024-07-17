import { Article } from "./article";
import { Card } from "@/components/card";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/nav";
import Particles from "@/components/particles";
import React from "react";
// import { Redis } from "@upstash/redis";
import { allProjects } from "contentlayer/generated";

// const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  // const views = (
  //   await redis.mget<number[]>(
  //     ...allProjects.map((p: { slug: any }) =>
  //       ["pageviews", "projects", p.slug].join(":")
  //     )
  //   )
  // ).reduce((acc: { [x: string]: any }, v: number, i: string | number) => {
  //   acc[allProjects[i].slug] = v ?? 0;
  //   return acc;
  // }, {} as Record<string, number>);

  const top1 = allProjects.find(
    (project: { slug: string }) => project?.slug === "first-dapp"
  )!;
  const top2 = allProjects.find(
    (project: { slug: string }) => project?.slug === "shopify-app"
  )!;
  const top3 = allProjects.find(
    (project: { slug: string }) => project?.slug === "micro-front"
  )!;
  const sorted = allProjects
    .filter((p: any) => p.published)
    .filter(
      (project: { slug: any }) =>
        project?.slug !== top1?.slug &&
        project?.slug !== top2?.slug &&
        project?.slug !== top3?.slug
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card key={top1?.slug}>
            <Link href={`/projects/${top1?.slug}`}>
              <article className="relative w-full h-full p-4 md:p-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {top1?.date ? (
                      <time dateTime={new Date(top1?.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(top1?.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />
                    {/* {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0
                    )} */}
                  </span>
                </div>
                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {top1?.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {top1?.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Article key={project?._id} project={project} />
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Article key={project?._id} project={project} />
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Article key={project?._id} project={project} />
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Article key={project?._id} project={project} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
