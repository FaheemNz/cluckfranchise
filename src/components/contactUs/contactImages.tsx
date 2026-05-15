import Image from "next/image";

const images = [
    {
        src: "/assets/contactus/img1.avif",
        alt: "Contact Us - Image 1",
    },
    {
        src: "/assets/contactus/img2.avif",
        alt: "Contact Us - Image 2",
    },
    {
        src: "/assets/contactus/img3.avif",
        alt: "Contact Us - Image 3",
    },
];

const ContactImages = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">

                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative rounded-[32px] overflow-hidden shadow-lg w-full h-96 md:h-[32rem]"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 640px) 100vw,
                                   (max-width: 1024px) 50vw,
                                   33vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ContactImages;