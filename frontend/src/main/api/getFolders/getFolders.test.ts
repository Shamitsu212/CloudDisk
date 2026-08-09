import { beforeEach, describe, vi, it, expect } from "vitest";

import { getFolders } from "./getFolders";
import { tokenFetch } from "../../../app/shared/tokenFetch/tokenFetch";

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

        const result = await getFolders(1)

        expect(responseData).toEqual(result)

    })

    it("error", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false

        } as unknown as Response)

        await expect(getFolders(1)).rejects.toThrow("Ошибка загрузки папок")

    })

})