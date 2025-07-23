// import { useState } from 'react';
// import SubjectList from './SubjectList';
// import { FiUser, FiUsers } from 'react-icons/fi';

// export default function ViewNotes() {
//     const [selectedType, setSelectedType] = useState(null); // 'my' or 'admin'

//     return (
//         <div className="max-w-5xl mx-auto px-4 space-y-8 sm:mb-4 md:mb-0">
//             {!selectedType && (
//                 <>
//                     <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
//                         Explore Notes
//                     </h1>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
//                         {/* My Notes Card */}
//                         <div
//                             onClick={() => setSelectedType('my')}
//                             className="cursor-pointer flex flex-col h-full justify-between p-8 min-h-[280px] rounded-xl border dark:border-none shadow-lg dark:bg-slate-800 hover:shadow-xl transition"
//                         >
//                             <div>
//                                 <div className="text-5xl text-indigo-600 mb-4">
//                                     <FiUser />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">My Notes</h2>
//                                 <p className="text-gray-500 dark:text-gray-300">
//                                     Browse the notes that you’ve personally uploaded. You can manage, update, and download your files anytime.
//                                 </p>
//                             </div>
//                             <p className="mt-6 text-sm text-indigo-600 font-medium">
//                                 Click to view your subjects & uploaded notes →
//                             </p>
//                         </div>

//                         {/* All Notes Card */}
//                         <div
//                             onClick={() => setSelectedType('admin')}
//                             className="cursor-pointer flex flex-col h-full justify-between border dark:border-none p-8 min-h-[280px] rounded-xl shadow-lg dark:bg-slate-800 hover:shadow-xl transition"
//                         >
//                             <div>
//                                 <div className="text-5xl text-indigo-600 mb-4">
//                                     <FiUsers />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">All Notes</h2>
//                                 <p className="text-gray-500 dark:text-gray-300">
//                                     View notes shared by the admin. These are approved and accessible to all students for better learning.
//                                 </p>
//                             </div>
//                             <p className="mt-6 text-sm text-indigo-600 font-medium">
//                                 Click to view admin subjects & notes →
//                             </p>
//                         </div>
//                     </div>
//                 </>
//             )}

//             {selectedType && (
//                 <SubjectList
//                     type={selectedType}
//                     onBack={() => setSelectedType(null)}
//                 />
//             )}
//         </div>
//     );
// }
