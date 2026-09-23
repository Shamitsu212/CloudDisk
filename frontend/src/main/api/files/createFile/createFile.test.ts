import { beforeEach, describe, vi, it, expect } from "vitest";

import { createFile } from "./createFile";
import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

vi.mock("../../../../app/shared/tokenFetch/tokenFetch", () => ({
    tokenFetch: vi.fn(),
}));

describe("createFile", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("success", async () => {

        const responseData = {
            id: 1,
            name: "test.rar",
            type: "RAR",
            lastUpdate: "2026-09-23T18:00:00Z",
        };

        vi.mocked(tokenFetch).mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        const file = new File(
            ["test file content"],
            "test.rar",
            {
                type: "application/vnd.rar",
            }
        );

        const result = await createFile(1, file);

        expect(result).toEqual(responseData);
    });

    it("error", async () => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false,
            
        } as unknown as Response);

        const file = new File(

            ["test file content"],

            "test.rar",

            {
                type: "application/vnd.rar",
            }

        );

        await expect(createFile(2, file)).rejects.toThrow("Не удалось загрузить файл");
    });

});