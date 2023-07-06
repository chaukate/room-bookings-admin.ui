
type itemList = {
    className: string;
    href: string;
    title: string;
}
export const ListItem = (props : itemList) => {
    return (
        <>
            <li>
                <a className={props.className} href={props.href}>
                    {props.title}
                </a>
            </li>
        </>
    )
    
}