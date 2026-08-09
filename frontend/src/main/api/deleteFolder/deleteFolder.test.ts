import { beforeEach, describe, vi, it, expect } from "vitest";


import { tokenFetch } from "../../../app/shared/tokenFetch/tokenFetch";
import { deleteFolder } from "./deleteFolder";

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

        const result = await deleteFolder(1, 1)

        expect(result).toBeUndefined()

    })

    it("error", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false

        } as unknown as Response)

        await expect(deleteFolder(1, 1)).rejects.toThrow("Ошибка при удалении папки")
    })

})