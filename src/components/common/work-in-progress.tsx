"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkInProgress() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center px-4 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Image
                        src="/images/work_in_progress.png"
                        alt="Em construção"
                        width={300}
                        height={300}
                        className="mb-8 mx-auto"
                        priority
                    />
                    <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800 mb-2">
                        Página em construção
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto">
                        Estamos preparando essa parte do site com muito carinho.<br />
                        Volte em breve para mais conteúdo!
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
