
import { beforeEach, describe, it, expect } from "vitest"
import reducer, {login, logout, setLoading, setToken} from "./authSlice"

describe("aothSlice", () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it("login", () => {

        const user = {
            id: 1,
            email: "test@gmail.com",
            name: "test"
        }

        const state = reducer( 
            undefined,
            login({
                accessToken: "token",
                user
            })
        )

        expect(state.accessToken).toBe("token")
        expect(state.user).toEqual(user)
        expect(localStorage.getItem("accessToken")).toBe("token")

        expect(state.isAuth).toBe(true)

    })

    it("logout", () => {

        const user = {
            id: 1,
            email: "test@gmail.com",
            name: "test"
        }

        const loggedState = reducer( 
            undefined,
            login({
                accessToken: "token",
                user
            })
        )

        const state = reducer(loggedState, logout())

        expect(state.accessToken).toBeNull()
        expect(state.user).toBeNull()

        expect(state.isAuth).toBe(false)   

    })

    it("setLoading", () => {

        const state = reducer(undefined, setLoading(true))

        expect(state.isLoading).toBe(true)

    })

    it("setToken", () => {

        const state = reducer(undefined, setToken("test"))

        expect(state.accessToken).toBe("test")

        expect(state.isAuth).toBe(true)

    })

})