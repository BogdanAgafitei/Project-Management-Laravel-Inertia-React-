import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {Link, router} from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, fromProjectShow, project = null, queryParams = null}) {

  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    if (fromProjectShow) {
      router.get(route('project.show', project.id), queryParams);
    } else {
      router.get(route('task.index'), queryParams);
    }

  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    if (fromProjectShow) {
      router.get(route('project.show', project.id), queryParams);
    } else {
      router.get(route('task.index'), queryParams);
    }
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-grey-500">
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <TableHeading name="id" sortChanged={e => sortChanged("id")} sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction} sortable={true}>ID</TableHeading>
            <TableHeading sortable={false}>Image</TableHeading>
            <TableHeading name="name" sortChanged={e => sortChanged("name")} sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction} sortable={true}>Name</TableHeading>
            <TableHeading sortable={false}>Project Name</TableHeading>
            <TableHeading name="status" sortChanged={e => sortChanged("status")}
                          sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                          sortable={true}>Status</TableHeading>
            <TableHeading name="created_at" sortChanged={e => sortChanged("created_at")}
                          sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                          sortable={true}>Created date</TableHeading>
            <TableHeading name="due_date" sortChanged={e => sortChanged("due_date")}
                          sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                          sortable={true}>Due Date</TableHeading>
            <TableHeading name="priority" sortChanged={e => sortChanged("priority")}
                          sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                          sortable={true}>Priority</TableHeading>
            <TableHeading sortable={false}>Created by</TableHeading>
            <TableHeading sortable={false}>Assigned to</TableHeading>
            <TableHeading sortable={false}>Actions</TableHeading>
          </tr>
          </thead>
          <thead
            className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">
              <TextInput
                defaultValue={queryParams.name}
                className="w-full"
                placeholder="Task Name"
                onBlur={e => searchFieldChanged('name', e.target.value)}
                onKeyPress={e => onKeyPress('name', e)}
              />
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">
              <SelectInput
                defaultValue={queryParams.status}
                className="w-full"
                onChange={e => searchFieldChanged("status", e.target.value)}

              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2">
              <SelectInput
                defaultValue={queryParams.priority}
                className="w-full"
                onChange={e => searchFieldChanged("priority", e.target.value)}

              >
                <option value="">Select priority...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </SelectInput>
            </th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2"></th>
            <th className="px-3 py-2 text-center"></th>
          </tr>
          </thead>
          <tbody>
          {tasks.data.map(task => (
            <tr key={task.id} className="bg-white border-b">
              <td className="px-3 py-2">{task.id}</td>
              <td className="px-3 py-2">
                <img src={task.image_path} style={{width: 60}}></img>
              </td>
              <Link href={route('task.show', task.id)}>
                <th className="px-3 py-2">{task.name}</th>
              </Link>
              <th className="px-3 py-2 hover:underline">
                <Link href={route('project.show', task.project.id)}>
                  {task.project.name}
                </Link>
              </th>
              <td className="px-3 py-2">
                      <span className={TASK_STATUS_CLASS_MAP[task.status] + " px-2 py-1 rounded text-white font-bold"}>
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
              </td>

              <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
              <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
              <td className="px-3 py-2">
                      <span className={TASK_PRIORITY_CLASS_MAP[task.priority] + " px-2 py-1 rounded text-white font-bold"}>
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
              </td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2">{task.assignedTo?.name}</td>
              <td className="px-3 py-2">
                <Link href={route('task.edit', task.id)}
                      className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                <button onClick={e => deleteTask(task)}
                        className="font-medium text-red-600 hover:underline mx-1">Delete</button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} queryParams={queryParams}/>
    </>
  )
}
