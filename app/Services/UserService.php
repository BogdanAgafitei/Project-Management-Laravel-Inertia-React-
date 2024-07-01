<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class UserService
{

    /**
     * @param $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getAllUsersPaginated($request)
    {
        $query = User::query();

        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if ($request->has('name')) {
            $query->where("name", "like", "%" . $request->get('name') . "%");
        }
        if ($request->has('email')) {
            $query->where("email", 'like', '%' . $request->get('status') . '%');
        }
        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return UserResource::collection($users);
    }

    public function createUser($data)
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    public function updateUser(User $user, $data)
    {
        if ($data['password']) {
            $data['password'] = Hash::make($data['password']);
            $user->update($data);
        }

        $user->update(Arr::only($data, ['name', 'email']));

    }

    public function getAllUsers()
    {
        return UserResource::collection(User::all());
    }

}
