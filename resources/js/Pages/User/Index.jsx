import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, users, queryParams = null, success}) {

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('user.index'), queryParams);
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
    router.get(route('user.index'), queryParams);
  }

  const deleteUser = (user) => {
    if (window.confirm('Are you sure you want to delete the user')) {
      router.delete(route('user.destroy', user.id));
    } else {
      return;
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
          <Link href={route('user.create')}
                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Users"/>


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
                    <TableHeading name="name" sortChanged={e => sortChanged("name")} sort_field={queryParams.sort_field}
                                  sort_direction={queryParams.sort_direction} sortable={true}>Name</TableHeading>
                    <TableHeading name="email" sortChanged={e => sortChanged("email")}
                                  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  sortable={true}>Email</TableHeading>
                    <TableHeading name="created_at" sortChanged={e => sortChanged("created_at")}
                                  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction}
                                  sortable={true}>Created date</TableHeading>
                    <TableHeading sortable={false}>Actions</TableHeading>
                  </tr>
                  </thead>
                  <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2">
                      <TextInput
                        defaultValue={queryParams.name}
                        className="w-full"
                        placeholder="User Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)}
                      />
                    </th>
                    <th className="px-3 py-2">
                      <TextInput
                        defaultValue={queryParams.email}
                        className="w-full"
                        placeholder="User Email"
                        onBlur={e => searchFieldChanged('email', e.target.value)}
                        onKeyPress={e => onKeyPress('email', e)}
                      />
                    </th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2 text-center"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.data.map(user => (
                    <tr key={user.id} className="bg-white border-b">
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">{user.name}</td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link href={route('user.edit', user.id)}
                              className="font-medium text-blue-600 hover:underline mx-1">Edit</Link>
                        <button onClick={e => deleteUser(user)}
                                className="font-medium text-red-600 hover:underline mx-1">Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} queryParams={queryParams}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
