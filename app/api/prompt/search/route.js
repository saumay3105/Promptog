import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("searchText");

    
    if (!searchQuery) {
      const prompts = await Prompt.find({}).populate("creator");
      return new Response(JSON.stringify(prompts), { status: 200 });
    }

    
    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: searchQuery, $options: "i" } },
        { tag: { $regex: searchQuery, $options: "i" } }
      ]
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};