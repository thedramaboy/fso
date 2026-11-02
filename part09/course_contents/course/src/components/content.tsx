import Part from "./part"
import { type CoursePart } from "../types"

interface ContentProps {
    coursePart: CoursePart
}

export const Content = ({coursePart}: ContentProps) => {
    return <Part coursePart={coursePart}/>
}