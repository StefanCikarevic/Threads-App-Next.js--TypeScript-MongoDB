"use server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user.model";
import Thread from "@/models/thread.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  path,
  author,
  communityId,
}: Params) {
  connectToDatabase();
  try {
    console.log(text, author);
    const createdThread = await Thread.create({
      text,
      author,
      community: null, // Assign communityId if provided, or leave it null for personal account
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (e: any) {}
}
