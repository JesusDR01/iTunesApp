import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

interface PopularCoursesContext {
  useDefaultValue: [string, Dispatch<SetStateAction<string>>]
}

export const PopularCoursesContext =
  createContext<PopularCoursesContext | null>(null)

export const PopularCoursesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [screen, setScreen] = useState("")
  return (
    <PopularCoursesContext.Provider
      value={{
        useDefaultValue: [screen, setScreen],
      }}
    >
      {children}
    </PopularCoursesContext.Provider>
  )
}

export const usePopularCourses = () => {
  const context = useContext(PopularCoursesContext)

  if (context === null) {
    throw new Error("PopularCoursesContext error")
  }

  return context
}
