import { beforeEach, describe, vi, it, expect } from "vitest";
import { loginRequest } from "./authApi";

describe("logRequest", () => {

    beforeEach(() => {
      vi.restoreAllMocks();
    })

    it("Login", async () => {

      const data = {
        email: "test@gmail.com",
        password: "test",
      };

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

      const result = await loginRequest(data)

      expect(result).toEqual(responseData)
    })

    it("wrong data", async () => {

      const data = {
        email: "test@gmail.com",
        password: "wrong",
      };

      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
      });

      vi.stubGlobal("fetch", fetchMock);

      await expect(loginRequest(data)).rejects.toThrow(
        "Ошибка авторизации"
      )

    })

})