import { beforeEach, describe, vi, it, expect } from "vitest";

import { renameFolder } from "./renameFolder";
import { tokenFetch } from "../../../app/shared/tokenFetch/tokenFetch";

vi.mock("../../../app/shared/tokenFetch/tokenFetch", () => ({
    tokenFetch: vi.fn()
}))

describe("renameFolder", () => {

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it("success", async() => {

        const responseData = {
            user_id: 1,
            folder_id: 1,
            name: "new"
        }

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: true,
            json: vi.fn().mockResolvedValue(responseData)

        } as unknown as Response)

        const result = await renameFolder(1, 1, "new")

        expect(responseData).toEqual(result)

    })

    it("error", async() => {

        vi.mocked(tokenFetch).mockResolvedValue({

            ok: false

        } as unknown as Response)

        await expect(renameFolder(1, 1, "new")).rejects.toThrow("Ошибка при изменении имени папки")

    })

})