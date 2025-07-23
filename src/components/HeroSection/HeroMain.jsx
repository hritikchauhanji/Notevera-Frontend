import React from 'react'
import { FaArrowRight, FaChalkboardTeacher } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function HeroMain() {
    return (
        <section className="dark:bg-slate-950 text-gray-900 dark:text-white min-h-screen flex items-center justify-center px-6 py-12">
            <div className="max-w-4xl text-center">
                <div className="flex justify-center mb-6">
                    <FaChalkboardTeacher className="text-6xl text-indigo-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Study Smarter with <span className="text-indigo-600 dark:text-yellow-400">Notevera</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Your universal class notes platform – organize, access, and read anywhere, anytime.
                </p>
                <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-yellow-400 text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-all"
                >
                    Get Started <FaArrowRight />
                </Link>
            </div>
        </section>
    )
}

export default HeroMain