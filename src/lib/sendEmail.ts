export async function sendAPIEmail(
  userId: string,
  title?: string,
  model?: string,
  isAuthenticated?: boolean,
  systemPrompt?: string
): Promise<Chats> {
  try {
    const res = await fetchClient(API_ROUTE_CREATE_CHAT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        title,
        model: model || MODEL_DEFAULT,
        isAuthenticated,
        systemPrompt: systemPrompt || SYSTEM_PROMPT_DEFAULT,
      }),
    });

    const responseData = await res.json();

    if (!res.ok || !responseData.chat) {
      throw new Error(responseData.error || "Failed to create chat");
    }

    const chat: Chats = {
      id: responseData.chat.id,
      title: responseData.chat.title,
      created_at: responseData.chat.created_at,
      model: responseData.chat.model,
      system_prompt: responseData.chat.system_prompt,
    };
    await writeToIndexedDB("chats", chat);

    return chat;
  } catch (error) {
    console.error("Error creating new chat:", error);
    throw error;
  }
}
