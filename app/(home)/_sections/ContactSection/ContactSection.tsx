import LogoText from "@/app/components/ContactLink/ContactLink";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full px-4 pb-20 pt-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full items-start justify-between gap-4 sm:gap-8 lg:gap-16">
          <div className="flex w-full min-w-0 flex-col gap-5 text-(--dark-blue) lg:max-w-2xl lg:gap-8">
            <a
              href="https://www.linkedin.com/in/kriishap"
              target="_blank"
              rel="noreferrer"
              className="w-fit transition-colors duration-200 hover:text-(--bright-blue)"
            >
              <LogoText
                text="linkedin"
                symbol={<FaLinkedin className="h-6 w-6" />}
              />
            </a>

            <a
              href="https://github.com/kr1shap"
              target="_blank"
              rel="noreferrer"
              className="w-fit self-start transition-colors duration-200 hover:text-(--bright-blue) lg:ml-30"
            >
              <LogoText
                text="kr1shap"
                symbol={<FaGithub className="h-6 w-6" />}
              />
            </a>

            <a
              href="mailto:krisha9845@gmail.com"
              className="w-fit transition-colors duration-200 hover:text-(--bright-blue)"
            >
              <LogoText
                text="krisha9845@gmail.com"
                symbol={<MdEmail className="h-6 w-6" />}
              />
            </a>
          </div>

          <div className="w-auto shrink-0 text-right lg:pt-2">
            <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] text-(--dull-blue)">
              contact
            </h2>
            <p className="-mt-1 text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none text-(--dull-grey)">
              trust me i&apos;ll answer :)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
