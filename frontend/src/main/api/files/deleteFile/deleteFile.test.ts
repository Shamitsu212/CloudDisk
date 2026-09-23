import { beforeEach, describe, vi, it, expect } from "vitest";


import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";
import { deleteFile } from "./deleteFile";

vi.mock("../../../app/shared/tokenFetch/tokenFetch", () => ({
    tokenFetch: vi.fn()
}))

describe("deleteFolder.test", () => {

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("success", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: true,

        } as unknown as Response)

        const result = await deleteFile(1, 1)

        expect(result).toBeUndefined()

    })

    it("error", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false

        } as unknown as Response)

        await expect(deleteFile(1, 1)).rejects.toThrow("Ошибка при удалении файла")
    })

})