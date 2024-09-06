"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
    const router = usePathname()

    const getBreadcrumbItems = (path: any) => {
        const pathArray = path.split("/").filter((p: any) => !!p)
        const breadcrumbItems = [
            // { href: "/", label: "Home" },
            ...pathArray.map((p: any, i: number) => ({
                href: `/${pathArray.slice(0, i + 1).join("/")}`,
                label: p.charAt(0).toUpperCase() + p.slice(1)
            })),
        ]

        return breadcrumbItems
    }

    const breadcrumbItems = getBreadcrumbItems(router);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex text-xs">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <li
                            className={`breadcrumb-item ${index === breadcrumbItems.length - 1 ? " active" : ""
                                }`}
                        >
                            {index === breadcrumbItems.length - 1 ? (
                                <span className="font-semibold text-black">{item.label}</span>
                            ) : (
                                <Link href={item.href} className="text-slate-400">{item.label}</Link>
                            )}
                        </li>
                        <p className="mx-3 text-slate-400">
                            {index === breadcrumbItems.length - 1 ? "" : ">"}
                        </p>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;