"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface Slide {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    cta?: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
}

interface HeroProps {
    slides: Slide[];
    autoplay?: boolean;
    interval?: number;
}

export default function Hero({ slides, autoplay = true, interval = 5000 }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!autoplay) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoplay, interval, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[600px] overflow-hidden bg-black">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Background Image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />

                    {/* Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: 'var(--hero-overlay)',
                            opacity: 'var(--hero-overlay-opacity)'
                        }}
                    />

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-4 flex items-center">
                        <div className="max-w-2xl text-white">
                            {slide.subtitle && (
                                <p className="text-primary-400 font-semibold mb-2 animate-fade-in">
                                    {slide.subtitle}
                                </p>
                            )}
                            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 animate-slide-up" style={{ color: 'var(--hero-text)' }}>
                                {slide.title}
                            </h1>
                            {slide.description && (
                                <p className="text-xl mb-8 animate-slide-up" style={{ color: 'var(--hero-text)', opacity: 0.9 }}>
                                    {slide.description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4 animate-fade-in">
                                {slide.cta && (
                                    <Button
                                        size="lg"
                                        onClick={() => (window.location.href = slide.cta!.href)}
                                    >
                                        {slide.cta.text}
                                    </Button>
                                )}
                                {slide.secondaryCta && (
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-700"
                                        onClick={() => (window.location.href = slide.secondaryCta!.href)}
                                    >
                                        {slide.secondaryCta.text}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                            ? "bg-primary-500 w-8"
                            : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
