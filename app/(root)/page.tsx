import Link from "next/link";

import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { api } from "@/lib/handler/api";
import handleError from "@/lib/handler/error";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const test = async () => {
  try {
    return await api.users.getAll();
  } catch (error) {
    return handleError(error);
  }
};

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
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2018-01-01"),
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
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

export default async function Home({ searchParams }: SearchParams) {
  const session = await auth();
  console.log("Session", session);
  const { query = "", filter = "" } = await searchParams;

  // db fetch with this query
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = query
      ? question.title.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesFilter = filter
      ? question.tags
          .map((tag) => tag.name.toLowerCase())
          .includes(filter.toLowerCase())
      : true;
    return matchesQuery && matchesFilter;
  });

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
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
