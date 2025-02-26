import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const PATCH = async (request, { params }) => {
  const { voteType } = await request.json();

  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    if (voteType === "upvote") {
      prompt.upvotes += 1;
    } else if (voteType === "downvote") {
      prompt.downvotes += 1;
    }

    await prompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update vote count", { status: 500 });
  }
};