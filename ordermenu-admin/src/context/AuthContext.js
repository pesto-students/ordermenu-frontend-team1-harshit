import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()

const initialAuth = {
  userLoggedIn: false,
  userId: "",
  userData: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userLoggedIn: true, userId: action.payload }

    case "USERDATA":
      return { ...state, userData: action.payload }

    default:
      return state
  }
}

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useReducer(reducer, initialAuth)
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
