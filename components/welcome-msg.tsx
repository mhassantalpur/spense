// "use client"

// import { useUser } from "@clerk/nextjs"

// const WelcomeMsg = () => {
//     const {user, isLoaded} = useUser();

//     return (
//         <div className="space-y-2 mb-4">
//             <h2 className="text-2xl lg:text-4xl text-white font-medium">
//                 Welcome Back{isLoaded ? ", " : " "}{user?.firstName}
//             </h2>
//             <p className="text-sm lg:text-base text-[#89b6fd]">
//                 Take a look at your Budget
//             </p>
//         </div>
//     )
// }

// export default WelcomeMsg

"use client"

import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"

const WelcomeMsg = () => {
    const {user, isLoaded} = useUser();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">
                Welcome Back{mounted && isLoaded && user?.firstName ? `, ${user.firstName}` : ""}
            </h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">
                Take a look at your Budget
            </p>
        </div>
    );
}

export default WelcomeMsg