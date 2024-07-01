import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";
import classNames from "classnames";
import {useEffect, useRef} from "react";

export default function Show({auth, task, queryParams = null}) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Task "${task.name}"`}</h2>}
    >
      <Head title={`Task "${task.name}"`}/>

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div>
                <img
                  src={task.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 text-gray-900 dark:text-grey-100">
                <div className="grid gap-1 grid-cols-2">
                  <div>
                    <div className="mt-1">
                      <label className="font-bold text-lg">Task ID</label>
                      <p className="mt-1">{task.id}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Task Name</label>
                      <p className="mt-1">{task.name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Status</label>
                      <p className="mt-1">
                      <span
                        className={classNames(TASK_STATUS_CLASS_MAP[task.status], 'p-1 rounded text-white')}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Created By</label>
                      <p className="mt-1">{task.createdBy.name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Priority</label>
                      <p className="mt-1">
                        <span className={TASK_PRIORITY_CLASS_MAP[task.priority] + ' p-1 rounded text-white'}>
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                          </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <label className="font-bold text-lg">Due Date</label>
                      <p className="mt-1">{task.due_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Create Date</label>
                      <p className="mt-1">{task.due_date}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Updated By</label>
                      <p className="mt-1">{task.updatedBy.name}</p>
                    </div>
                    <div className="mt-4">
                      <label className="font-bold text-lg">Assigned to</label>
                      <p className="mt-1">{task.assignedTo.name}</p>
                    </div>

                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Task Description</label>
                  <p className="mt-1">{task.description}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
    </AuthenticatedLayout>
  )
}
