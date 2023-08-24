"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="current_user"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    type="text"
                    {...field}
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
