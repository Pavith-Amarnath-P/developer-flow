import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help?",
    tags: [
      {
        _id: "1",
        name: "react",
      },
      {
        _id: "2",
        name: "javascript",
      },
    ],
    author: { _id: "1", name: "John Doe" },
    upVotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn Next.js?",
    description: "I want to learn Next.js, can anyone help?",
    tags: [
      {
        _id: "1",
        name: "next.js",
      },
      {
        _id: "2",
        name: "javascript",
      },
    ],
    author: { _id: "1", name: "John Doe" },
    upVotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

export default async function Home({ searchParams }: SearchParams) {
  const { query = "" } = await searchParams;

  // db fetch with this query
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
          route={ROUTES.HOME}
        />
      </section>
      Home Filter
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
}
