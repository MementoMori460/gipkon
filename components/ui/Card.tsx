import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    image?: string;
    href?: string;
    badge?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, title, description, image, href, badge, ...props }, ref) => {
        const CardContent = (
            <div
                className={cn(
                    "group relative overflow-hidden rounded-xl",
                    "hover:shadow-xl transition-all duration-300",
                    "cursor-pointer",
                    className
                )}
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    borderWidth: '1px',
                    color: 'var(--card-text)'
                }}
                ref={ref}
                {...props}
            >
                {/* Image */}
                {image && (
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {badge && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                                {badge}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-colors" style={{ color: 'var(--card-text)' }}>
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm line-clamp-3" style={{ color: 'var(--card-text)', opacity: 0.8 }}>{description}</p>
                    )}

                    {href && (
                        <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                            <span>Detaylar</span>
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        );

        if (href) {
            return <Link href={href}>{CardContent}</Link>;
        }

        return CardContent;
    }
);

Card.displayName = "Card";

export default Card;
