import Image from "next/image";

const jobs = [
    {
      title: 'QA Automation Developer',
      subtitle: 'IBM',
      date: 'Jan 2022 - Present',
      description: [
        'Contributed to major releases 10.0.5.x, 10.0.8.x, 10.0.10.x',
        'Automated features over 4 different platforms'
      ],
      icon: '/pngs/ibm.png'
    }
  ];
  

const Work = () => {
    return (
        <div className="py-10 px-4 sm:px-8 max-w-4xl mx-auto">
            {jobs.map((job, index) => (
                <div key={index} className="relative pl-6 sm:pl-10 border-l border-gray-400 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="w-full sm:w-5/6">
                            <h3 className="text-xl sm:text-4xl font-semibold text-white">
                                {job.title}
                                <span className="block sm:inline text-md sm:text-2xl font-normal text-gray-300 ml-1">
                                    @ {job.subtitle}
                                </span>
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">{job.date}</p>
                            {job.description && (
                                <ul className="mt-2 text-white list-disc list-inside space-y-1 text-base">
                                    {job.description.map((desc, idx) => (
                                        <li key={idx} className="text-md sm:text-2xl">{desc}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
                            <Image src={job.icon} width={50} height={50} alt="icon" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Work;
