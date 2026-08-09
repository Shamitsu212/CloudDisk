import { beforeEach, describe, vi, it, expect } from "vitest";

import { createFolder } from "./createFolder";
import { tokenFetch } from "../../../app/shared/tokenFetch/tokenFetch";

vi.mock("../../../app/shared/tokenFetch/tokenFetch", () => ({
  tokenFetch: vi.fn(),
}));

describe("createFolder", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("success", async () => {

    const responseData = {
      user_id: 1,
      name: "test",
    };

    vi.mocked(tokenFetch).mockResolvedValue({

      ok: true,
      json: vi.fn().mockResolvedValue(responseData),

    } as unknown as Response);

    const result = await createFolder(1, "test");

    expect(result).toEqual(responseData);

  });

  it("error", async () => {

    vi.mocked(tokenFetch).mockResolvedValue({

      ok: false,

    } as unknown as Response);

    await expect(createFolder(2, "test")).rejects.toThrow("Не удалось создать папку")
    
  });
});