"use client";
import Link from "next/link";

type SiderBarItemProps = {
    item: {
        label: string;
        href: string;
    };
    className: string; // Cambiado de 'class' a 'className'
    key ?: string
};

export function SideBarItem(props: SiderBarItemProps) {
    const { className, item } = props;
    const { label, href } = item; // Desestructuración de 'label' y 'href'
    
    return (
        <Link href={href} className={`${className}`}>
            {label}
        </Link>
    );
}
