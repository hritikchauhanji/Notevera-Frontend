import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiDownload, FiFileText, FiMail, FiPhone, FiUpload } from 'react-icons/fi';

export default function DashboardHome() {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
                Welcome to <span className="text-indigo-600 dark:text-indigo-400">Notevera</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Upload, explore, and download notes with ease.
            </p>

            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto mb-10">
                {[
                    {
                        title: 'Upload Notes',
                        description: 'Share your notes with peers and contribute to the community.',
                        icon: <FiUpload className="text-3xl text-indigo-500" />,
                    },
                    {
                        title: 'View Notes',
                        description: 'Browse through various topics and subjects easily.',
                        icon: <FiFileText className="text-3xl text-indigo-500" />,
                    },
                    {
                        title: 'Download Notes',
                        description: 'Access notes offline and study on the go.',
                        icon: <FiDownload className="text-3xl text-indigo-500" />,
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="w-full sm:text-center sm:w-[65%] lg:w-[30%] border border-indigo-500 rounded-xl p-6 hover:shadow-lg transition dark:border-indigo-400"
                    >
                        <div className="mb-4">{item.icon}</div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {item.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => window.location.href = '/dashboard/view-notes'}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg transition-all shadow mb-10"
            >
                Go to Notes
            </button>

            {/* Contact Help Card */}
            <div className="max-w-xl mx-auto border border-l-4 border-indigo-500 dark:bg-slate-950 dark:border-indigo-400 shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    If you have any questions, issues, or feedback, feel free to reach out to us.
                </p>

                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 bg-indigo-50 dark:bg-slate-800 px-4 py-3 rounded-lg hover:shadow transition">
                        <FiMail className="text-indigo-600 text-xl" />
                        <div>
                            <a
                                href="mailto:hritikchji@gmail.com"
                                className="text-base font-medium text-indigo-700 dark:text-indigo-300 hover:underline"
                            >
                                hritikchji@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 bg-indigo-50 dark:bg-slate-800 px-4 py-3 rounded-lg hover:shadow transition">
                        <FiPhone className="text-indigo-600 text-xl" />
                        <div>
                            <a
                                href="tel:+916396629193"
                                className="text-base font-medium text-indigo-700 dark:text-indigo-300 hover:underline"
                            >
                                +91 6396629193
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-between pt-3 gap-2">
                        <a
                            href="https://www.linkedin.com/in/hritik-chauhan-ji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                        >
                            <FaLinkedin className="text-xl" /> LinkedIn
                        </a>

                        <a
                            href="https://github.com/hritikchauhanji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition"
                        >
                            <FaGithub className="text-xl" /> GitHub
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
