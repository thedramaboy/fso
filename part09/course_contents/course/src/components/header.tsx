interface HeaderProps {
    name: string
}

export const Header = ({name}: HeaderProps) => {
    return (<h1>{name}</h1>)
};