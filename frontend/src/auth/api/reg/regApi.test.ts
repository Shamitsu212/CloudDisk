import { beforeEach, describe, vi, it, expect } from "vitest";
import { regRequest } from "./regApi";

describe("regRequest", () => {

    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it("success", async () => {

        const data = {
            email: "test@gmail.com",
            name: "Test",
            password: "pass"
        }

        const responseData = {
            accessToken: "token",
            user: {
              id: 1,
              email: "test@gmail.com",
              name: "Test",
            },
        }

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(responseData),
        })

        vi.stubGlobal("fetch", fetchMock)

        const result = await regRequest(data)

        expect(result).toEqual(responseData)

    })

    it("wrong data", async() => {

        const data = {
            email: "wrong_gmail.com",
            name: "wrong_name",
            password: "wrong_pass"
        }

        const fetchMock = vi.fn().mockResolvedValue({
            ok: false
        })

        vi.stubGlobal("fetch", fetchMock)

        await expect(regRequest(data)).rejects.toThrow(
            "Ошибка регистрации"
        )

    })


})