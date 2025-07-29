
import { topLinkItem } from "@/utils/constants"
import Link from "next/link";

const TopLink = () => {

    return (
        <div className="w-full hidden md:flex flex-row justify-center items-center gap-5">
            {topLinkItem && topLinkItem.map((item, index) => (                
                <Link key={index} href={item.href} className="text-sm font-medium text-gray-700 hover:text-primary">
                    {item.name}
                </Link>                
            )
            )}
        </div>
    )
}

export default TopLink;