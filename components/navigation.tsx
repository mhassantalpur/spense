"use client";

const routes = [
    {
        href: "/",
        label: "Overview"
    },
    {
        href: "/transactions",
        label: "Transactions"
    },
    {
        href: "/accounts",
        label: "Accounts"
    },
    {
        href: "/categories",
        label: "Categories"
    },
    {
        href: "/settings",
        label: "Settings"
    },
]

const navigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
        {routes.map((route) => (
            <p>{route.label}</p>
        ))}
    </nav>
  )
}

export default navigation