import Article, { ArticleType } from "@/components/article";

import { Card } from "@/components/card";
import Link from "next/link";
import { Navigation } from "@/components/nav";
import { allProjects } from "@/.contentlayer/generated";

export default async function ArticlePage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Article
          </h2>
          <p className="mt-4 text-zinc-400">
            Documentation of problems encountered at work 👩‍💼, learning 📚, and
            sharing of application techniques
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 0)
              .map((article: ArticleType, index: number) => (
                <Card key={index}>
                  <Article article={article} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 1)
              .map((article: ArticleType, index: number) => (
                <Card key={index}>
                  <Article article={article} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allProjects
              .filter((_, i) => i % 3 === 2)
              .map((article: ArticleType, index: number) => (
                <Card key={index}>
                  <Article article={article} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
