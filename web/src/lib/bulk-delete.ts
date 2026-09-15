export type BulkDeleteApiResult = {
  success: boolean;
  error?: string;
};

type BulkDeleteRequest = (
  endpoint: string,
  options: RequestInit
) => Promise<BulkDeleteApiResult>;

export type BulkDeleteOutcome = {
  success: boolean;
  deletedIds: string[];
  error?: string;
};

export async function deleteSelectedMemories(
  ids: string[],
  request: BulkDeleteRequest
): Promise<BulkDeleteOutcome> {
  const promptIds = ids.filter((id) => id.startsWith("prompt_"));
  const memoryIds = ids.filter((id) => !id.startsWith("prompt_"));
  const deletedIds: string[] = [];

  const groups = [
    { endpoint: "/api/prompts/bulk-delete", ids: promptIds },
    { endpoint: "/api/memories/bulk-delete", ids: memoryIds },
  ];

  for (const group of groups) {
    if (group.ids.length === 0) continue;

    const result = await request(group.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: group.ids, cascade: true }),
    });

    if (!result.success) {
      return {
        success: false,
        deletedIds,
        error: result.error,
      };
    }

    deletedIds.push(...group.ids);
  }

  return { success: true, deletedIds };
}
