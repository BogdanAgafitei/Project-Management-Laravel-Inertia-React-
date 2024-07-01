import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, projects, queryParams = null, success}) {

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('project.index'), queryParams);
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
    router.get(route('project.index'), queryParams);
  }

  const deleteProject = (project) => {
    if(window.confirm('Are you sure you want to delete the project')){
      router.delete(route('project.destroy', project.id));
    }else{
      return;
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
          <Link href={route('project.create')}
                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects"/>


      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success &&
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          }
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-grey-100">
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
                    <TableHeading name="status" sortChanged={e => sortChanged("status")}
                                  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  sortable={true}>Status</TableHeading>
                    <TableHeading name="created_at" sortChanged={e => sortChanged("created_at")}
                                  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  sortable={true}>Created date</TableHeading>
                    <TableHeading name="due_date" sortChanged={e => sortChanged("due_date")}
                                  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  sortable={true}>Due Date</TableHeading>
                    <TableHeading sortable={false}>Created by</TableHeading>
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
                        placeholder="Project Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                      />
                    </th>
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
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2 text-center"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {projects.data.map(project => (
                    <tr key={project.id} className="bg-white border-b">
                      <td className="px-3 py-2">{project.id}</td>
                      <td className="px-3 py-2">
                        <img src={project.image_path} style={{width: 60}}></img>
                      </td>
                      <Link href={route('project.show', project.id)}>
                      <td className="px-3 py-2">{project.name}</td>
                      </Link>
                      <td className="px-3 py-2">
                      <span
                        className={PROJECT_STATUS_CLASS_MAP[project.status] + " px-2 py-1 rounded text-white font-bold"}>
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                      <td className="px-3 py-2">{project.createdBy.name}</td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link href={route('project.edit', project.id)}
                              className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                        <button onClick={e => deleteProject(project)}
                              className="font-medium text-red-600 hover:underline mx-1">Delete</button>
                      </td>
                    </tr>
                  ))}

                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
