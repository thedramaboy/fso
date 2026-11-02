interface TotalProps {
    totalCount: number
}

export const Total = ({totalCount}: TotalProps) => {
    return (<p>Number of exercises {totalCount}</p>)
}