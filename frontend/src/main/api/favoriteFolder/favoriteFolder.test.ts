import { beforeEach, describe, vi, it, expect } from "vitest";

import { favoriteFolder } from "./favoriteFolder";
import { tokenFetch } from "../../../app/shared/tokenFetch/tokenFetch";

vi.mock("../../../app/shared/tokenFetch/tokenFetch", () => ({
    tokenFetch: vi.fn()
}))

describe("favoriteFolder", () => {

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("succes", async() => {

        const responseData = {
            user_id: 1,
            folder_id: 1,
        };

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: true,
            json: vi.fn().mockResolvedValue(responseData)

        } as unknown as Response)

        const result = await favoriteFolder(1, 1)

        expect(result).toEqual(responseData)
    })

    it("error", async() => {


        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false,

        } as unknown as Response)

        await expect(favoriteFolder(1, 1)).rejects.toThrow("Ошибка при добавлении в избранные")

    })

})