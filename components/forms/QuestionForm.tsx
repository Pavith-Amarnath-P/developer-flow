"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

export default function QuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (
        tagInput &&
        tagInput.length < 15 &&
        !field.value.includes(tagInput.toLowerCase())
      ) {
        form.setValue("tags", [...field.value, tagInput.toLowerCase()]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag length should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput.toLowerCase())) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    }
  };
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateQuestion)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-brand">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your question title"
                    {...field}
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  />
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Be specific and imagine you are asking a question to another
                  person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem{" "}
                  <span className="text-brand">*</span>
                </FormLabel>
                <FormControl>
                  <Editor
                    editorRef={editorRef}
                    value={field.value}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Introduce the problem and expand on what you need help with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-brand">*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Add tags..."
                      className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                        {field.value.map((tag) => (
                          <TagCard
                            key={tag}
                            _id={tag}
                            name={tag}
                            compact
                            remove
                            isButton
                            handleTagRemove={() => handleTagRemove(tag, field)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription className="body-regular text-light-500 mt-2.5">
                  Add up to 3 tags to describe what your question is about. You
                  need to press enter to add a tag. person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Ask Question</Button>
        </form>
      </Form>
    </div>
  );
}
