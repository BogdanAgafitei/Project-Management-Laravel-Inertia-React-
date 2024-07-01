<?php

namespace App\Services;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskService
{
    public function getTasksPaginated($request)
    {
        $query = Task::query();

        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if ($request->has('name')) {
            $query->where("name", "like", "%" . $request->get('name') . "%");
        }
        if ($request->has('status')) {
            $query->where("status", $request->get('status'));
        }

        if ($request->has('priority')) {
            $query->where("priority", $request->get('priority'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return TaskResource::collection($tasks);
    }

    public function getTaskByProject(Project $project, $request)
    {
        $query = $project->tasks();

        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if ($request->has('name')) {
            $query->where("name", "like", "%" . $request->get('name') . "%");
        }
        if ($request->has('status')) {
            $query->where("status", $request->get('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return TaskResource::collection($tasks);
    }

    public function createTask($data)
    {
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        return Task::create($data);
    }


    public function updateTask($task, $data)
    {
        $data['updated_by'] = auth()->id();
        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(10), 'public');
        }
        $task->update($data);
    }

    public function deleteTask($task)
    {
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
    }

}
