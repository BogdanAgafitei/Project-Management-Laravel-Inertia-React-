import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import classNames from "classnames";
import TasksTable from "@/Pages/Task/TasksTable.jsx";
import {useEffect, useRef} from "react";

export default function Show({auth, project, tasks, queryParams = null}) {

  const div = useRef(null);
  useEffect(() =>
    div.current.scrollIntoView({ behavior: "smooth", block: "end" })
  );

  return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Project "${project.name}"`}</h2>}
      >
        <Head title={`Project "${project.name}"`}/>

        <div ref={div}>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div>
                <img
                  src={project.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 text-gray-900 dark:text-grey-100">
                <div className="grid gap-1 grid-cols-2">
                  <div>
                    <div className="mt-1">
                      <label className="font-bold text-lg">Project ID</label>
                      <p className="mt-1">{project.id}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Project Name</label>
                      <p className="mt-1">{project.name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Status</label>
                      <p className="mt-1">
                      <span
                        className={classNames(PROJECT_STATUS_CLASS_MAP[project.status], 'p-1 rounded')}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">{project.createdBy.name}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <label className="font-bold text-lg">Due Date</label>
                      <p className="mt-1">{project.due_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Create Date</label>
                      <p className="mt-1">{project.due_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Updated By</label>
                      <p className="mt-1">{project.updatedBy.name}</p>
                    </div>

                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Project Description</label>
                  <p className="mt-1">{project.description}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-grey-100">
                <label className="font-bold text-lg ">Tasks</label>
                <TasksTable project={project} fromProjectShow={true} tasks={tasks} queryParams={queryParams}/>
              </div>
            </div>
          </div>
        </div>
        </div>
      </AuthenticatedLayout>
  )
}
