import { beforeEach, describe, vi, it, expect } from "vitest";

import { getFiles } from "./getFiles";
import { tokenFetch } from "../../../../app/shared/tokenFetch/tokenFetch";

vi.mock("../../../app/shared/tokenFetch/tokenFetch", () => ({
    tokenFetch: vi.fn()
}))

describe("getFolders", () => {

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("success", async() => {

        const responseData = {
            folders: []
        }

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: true,
            json: vi.fn().mockResolvedValue(responseData)

        } as unknown as Response)

        const result = await getFiles(1)

        expect(responseData).toEqual(result)

    })

    it("error", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false

        } as unknown as Response)

        await expect(getFiles(1)).rejects.toThrow("Ошибка загрузки файлов")

    })

})